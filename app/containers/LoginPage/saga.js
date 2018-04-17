import { all, call, put, select, takeLatest } from 'redux-saga/effects';
import { push } from 'react-router-redux';
import jwt from 'jsonwebtoken';
import find from 'lodash/find';

import { removeToken, storeAuthStatus, storeToken } from 'utils/tokenService';
import { checkAuthenticated } from 'utils/auth';
import { showNotification } from 'containers/Notification/actions';
import { makeSelectLocation } from 'containers/App/selectors';
import { setOrganization, setUser } from 'containers/App/contextActions';
import { getLinkUrlByRole, getRoleByScope } from 'containers/App/helpers';
import { getPractitioner } from 'containers/ManagePractitionerPage/api';
import { getOrganization, getPatient } from 'containers/App/contextApi';
import { getLoginErrorDetail, login } from './api';
import { loginError, loginSuccess } from './actions';
import { LOGIN } from './constants';

function* loginSaga(loginAction) {
  try {
    const authData = yield call(login, loginAction.loginCredentials);
    const { user_id, user_name, email, scope, ext_attr } = yield call(jwt.decode, authData.access_token);
    yield put(setUser({ user_id, user_name, email, scope, ext_attr }));
    yield call(storeToken, authData);
    yield call(storeAuthStatus, true);
    const isAuthenticated = yield call(checkAuthenticated);
    if (!isAuthenticated) {
      yield put(showNotification('Access is denied.'));
      yield call(removeToken);
    }
    yield put(loginSuccess(isAuthenticated));
    yield call(loginAction.handleSubmitting);
    // Redirect to referrer address
    const location = yield select(makeSelectLocation());
    // get scope starts with 'ocp.role'
    const roleScope = find(scope, (s) => s.startsWith('ocp.role'));
    const userRole = yield call(getRoleByScope, roleScope);
    const linkUrl = yield call(getLinkUrlByRole, userRole);

    // get user resource when resource id available
    let resource;
    if (ext_attr.resource === 'Practitioner') {
      resource = yield call(getPractitioner, ext_attr.id);
    }
    if (ext_attr.resource === 'Patient') {
      resource = yield call(getPatient, ext_attr.id);
    }
    yield put(setUser({ user_id, user_name, email, scope, ext_attr, resource, role: userRole }));

    // get organization resource when user associate with organization
    const organizationId = roleScope.replace(/\D+/g, '');
    if (organizationId !== null && organizationId !== '') {
      const organizationResource = yield call(getOrganization, organizationId);
      yield put(setOrganization(organizationResource));
    }

    const { from } = location.state || { from: { pathname: linkUrl } };
    yield put(push(from));
  } catch (error) {
    yield put(loginError(getLoginErrorDetail(error)));
    yield put(showNotification('Failed to login.'));
    yield call(loginAction.handleSubmitting);
  }
}

function* watchLoginSaga() {
  yield takeLatest(LOGIN, loginSaga);
}

/**
 * Root saga manages watcher lifecycle
 */
export default function* rootSaga() {
  yield all([
    watchLoginSaga(),
  ]);
}
