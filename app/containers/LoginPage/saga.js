import { all, call, put, takeLatest } from 'redux-saga/effects';
import { push } from 'react-router-redux';

import { login } from './api';
import { showNotification } from '../Notification/actions';
import { loginSuccess } from './actions';
import { LOGIN_REQUEST } from './constants';
import { HOME_URL } from '../App/constants';

function* requestLoginSaga({ loginCredentials }) {
  try {
    const authData = yield call(login, loginCredentials);
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

/**
 * Root saga manages watcher lifecycle
 */
export default function* rootSaga() {
  yield all([
    watchRequestLoginSaga(),
  ]);
}
