import { all, call, put, select, takeLatest } from 'redux-saga/effects';
import { push } from 'react-router-redux';
import jwt from 'jsonwebtoken';

import { removeToken, storeAuthStatus, storeToken } from 'utils/tokenService';
import { checkAuthenticated } from 'utils/auth';
import { WORKSPACE_SELECTION_URL } from 'containers/App/constants';
import { showNotification } from 'containers/Notification/actions';
import { makeSelectLocation } from 'containers/App/selectors';
import { setUser } from 'containers/App/contextActions';
import { getLoginErrorDetail, login } from './api';
import { loginError, loginSuccess } from './actions';
import { LOGIN } from './constants';

function* loginSaga(loginAction) {
  try {
    const authData = yield call(login, loginAction.loginCredentials);
    const { user_id, user_name, email, scope } = yield call(jwt.decode, authData.access_token);
    yield put(setUser({ user_id, user_name, email, scope }));
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
    const { from } = location.state || { from: { pathname: WORKSPACE_SELECTION_URL } };
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
