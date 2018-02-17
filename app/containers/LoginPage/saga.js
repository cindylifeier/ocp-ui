import { all, call, put, takeLatest } from 'redux-saga/effects';
import { push } from 'react-router-redux';

import { login } from './api';
import { showNotification } from '../Notification/actions';
import { loginSuccess } from './actions';
import { LOGIN_REQUEST, LOGOUT_REQUEST } from './constants';
import { HOME_URL, LOGIN_URL } from '../App/constants';
import { removeToken, storeToken } from '../../utils/tokenService';

function* requestLoginSaga({ loginCredentials }) {
  try {
    const authData = yield call(login, loginCredentials);
    storeToken(authData);
    yield put(loginSuccess(authData));
    yield put(push(HOME_URL));
    yield put(showNotification('Login successfully.'));
  } catch (error) {
    yield put(showNotification('Failed to login.'));
    throw error;
  }
}

function* watchRequestLoginSaga() {
  yield takeLatest(LOGIN_REQUEST, requestLoginSaga);
}

function* requestLogoutSaga() {
  try {
    removeToken();
    yield put(push(LOGIN_URL));
  } catch (error) {
    yield put(showNotification('Failed to logout.'));
    throw error;
  }
}

function* watchRequestLogoutSaga() {
  yield takeLatest(LOGOUT_REQUEST, requestLogoutSaga);
}

/**
 * Root saga manages watcher lifecycle
 */
export default function* rootSaga() {
  yield all([
    watchRequestLoginSaga(),
    watchRequestLogoutSaga(),
  ]);
}
