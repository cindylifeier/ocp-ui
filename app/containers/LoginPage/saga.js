import { all, call, put, select, takeLatest } from 'redux-saga/effects';
import { push } from 'react-router-redux';

import { login } from './api';
import { showNotification } from '../Notification/actions';
import { loginFailure, loginSuccess } from './actions';
import { LOGIN_REQUEST, LOGOUT_REQUEST } from './constants';
import { HOME_URL, LOGIN_URL } from '../App/constants';
import { removeToken, retrieveToken, storeToken } from '../../utils/tokenService';
import { makeSelectLocation } from '../App/selectors';
import { hasAccessScopeInToken } from '../../utils/auth';

function* requestLoginSaga({ loginCredentials }) {
  try {
    const authData = yield call(login, loginCredentials);
    storeToken(authData);
    let isAuthenticated = false;
    if (hasAccessScopeInToken(retrieveToken())) {
      isAuthenticated = true;
    } else {
      yield put(showNotification('Access is denied.'));
      removeToken();
    }
    yield put(loginSuccess(isAuthenticated));
    // Redirect to referrer address
    const location = yield select(makeSelectLocation());
    const { from } = location.state || { from: { pathname: HOME_URL } };
    yield put(push(from));
  } catch (error) {
    yield put(loginFailure());
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
