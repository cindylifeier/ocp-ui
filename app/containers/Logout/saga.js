import { all, call, put, takeLatest } from 'redux-saga/effects';
import { push } from 'react-router-redux';

import { removeToken } from 'utils/tokenService';
import { showNotification } from 'containers/Notification/actions';
import { LOGIN_URL } from 'containers/App/constants';
import { LOGOUT } from './constants';

function* logoutSaga() {
  try {
    yield call(removeToken);
    setTimeout(() => {
      // FIXME: retrieve the UAA endpoint config from backend
      // FIXME: consider computing redirect endpoint
      window.location = 'http://localhost:8080/uaa/logout.do?redirect=http://localhost:3000';
    }, 0);
    yield put(push(LOGIN_URL));
  } catch (error) {
    yield put(showNotification('Failed to logout.'));
    throw error;
  }
}

function* watchLogoutSaga() {
  yield takeLatest(LOGOUT, logoutSaga);
}

/**
 * Root saga manages watcher lifecycle
 */
export default function* rootSaga() {
  yield all([
    watchLogoutSaga(),
  ]);
}
