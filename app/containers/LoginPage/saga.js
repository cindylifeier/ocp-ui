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
import { OCP_ADMIN_ROLE_CODE } from 'containers/App/constants';
import { getLoginErrorDetail, getUserContext, login } from './api';
import { loginError, loginSuccess } from './actions';
import { LOGIN } from './constants';

function* loginSaga(loginAction) {
  try {
    const authData = yield call(login, loginAction.loginCredentials);
    const { user_id, user_name, email, scope, ext_attr } = yield call(jwt.decode, authData.access_token);
    const roleScope = find(scope, (s) => s.startsWith('ocp.role'));
    const userRole = yield call(getRoleByScope, roleScope);
    yield put(setUser({ user_id, user_name, email, scope, ext_attr, role: userRole }));

    yield call(storeToken, authData);
    yield call(storeAuthStatus, true);
    const isAuthenticated = yield call(checkAuthenticated);
    if (!isAuthenticated) {
      yield put(showNotification('Access is denied.'));
      yield call(removeToken);
    }
    yield put(loginSuccess(isAuthenticated));
    yield call(loginAction.handleSubmitting);

    // Retreving user resource and organization details
    if (userRole !== OCP_ADMIN_ROLE_CODE) {
      const userContext = yield call(getUserContext);
      const { resource, organization } = userContext;
      yield put(setUser({ user_id, user_name, email, scope, ext_attr, resource, role: userRole }));
      yield put(setOrganization(organization));
    }

    // Redirect to referrer address
    const location = yield select(makeSelectLocation());
    const linkUrl = yield call(getLinkUrlByRole, userRole);
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
