import { all, call, put, select, takeLatest } from 'redux-saga/effects';
import { push } from 'react-router-redux';

import { login } from './api';
import { showNotification } from '../Notification/actions';
import { loginError, loginSuccess } from './actions';
import { LOGIN } from './constants';
import { HOME_URL } from '../App/constants';
import { removeToken, retrieveToken, storeToken } from '../../utils/tokenService';
import { makeSelectLocation } from '../App/selectors';
import { hasAccessScopeInToken } from '../../utils/auth';

function* requestLoginSaga(loginAction) {
  try {
    const authData = yield call(login, loginAction.loginCredentials);
    storeToken(authData);
    let isAuthenticated = false;
    if (hasAccessScopeInToken(retrieveToken())) {
      isAuthenticated = true;
    } else {
      yield put(showNotification('Access is denied.'));
      removeToken();
    }
    yield put(loginSuccess(isAuthenticated));
    yield call(loginAction.handleSubmitting);
    // Redirect to referrer address
    const location = yield select(makeSelectLocation());
    const { from } = location.state || { from: { pathname: HOME_URL } };
    yield put(push(from));
  } catch (error) {
    yield put(loginError());
    yield put(showNotification('Failed to login.'));
    yield call(loginAction.handleSubmitting);
    throw error;
  }
}

function* watchRequestLoginSaga() {
  yield takeLatest(LOGIN, requestLoginSaga);
}

/**
 * Root saga manages watcher lifecycle
 */
export default function* rootSaga() {
  yield all([
    watchRequestLoginSaga(),
  ]);
}
