// import { take, call, put, select } from 'redux-saga/effects';

import { all, call, put, select, takeLatest } from 'redux-saga/effects';

import { showNotification } from 'containers/Notification/actions';
import { makeSelectOrganization } from 'containers/App/contextSelectors';
import { GET_USERS } from './constants';
import { getUsers } from './api';
import { getUsersSuccess, getUsersError } from './actions';


export function* getUsersSaga() {
  try {
    const organization = yield select(makeSelectOrganization());
    const users = yield call(getUsers, organization.logicalId);
    yield put(getUsersSuccess(users));
  } catch (err) {
    yield put(getUsersError(err));
    yield put(showNotification(`Failed to users: ${getErrorDetail(err)}`));
  }
}


export function getErrorDetail(error) {
  let errorDetail = error.message;
  if (error && error.message === 'Failed to fetch') {
    errorDetail = ' Server is offline.';
  } else if (error && error.response && error.response.status === 500) {
    errorDetail = ' Unknown server error.';
  }
  return errorDetail;
}

export function* watchGetUsersSaga() {
  yield takeLatest(GET_USERS, getUsersSaga);
}

/**
 * Root saga manages watcher lifecycle
 */
export default function* rootSaga() {
  yield all([
    watchGetUsersSaga(),
  ]);
}
