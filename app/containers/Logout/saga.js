import { all, call, put, takeLatest } from 'redux-saga/effects';
import { push } from 'react-router-redux';

import { showNotification } from '../Notification/actions';
import { LOGIN_URL } from '../App/constants';
import { removeToken } from '../../utils/tokenService';
import { LOGOUT } from './constants';

function* logoutSaga() {
  try {
    yield call(removeToken);
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
