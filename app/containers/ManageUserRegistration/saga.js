// import { take, call, put, select } from 'redux-saga/effects';

import { all, call, put, takeLatest } from 'redux-saga/effects';
import { goBack } from 'react-router-redux';

import { showNotification } from 'containers/Notification/actions';
import { getGroups } from 'containers/PermissionsGroups/api';
import { GET_GROUPS, GET_USER, SAVE_USER } from './constants';
import { getUser, saveUser } from './api';
import { getUserError, getUserSuccess, getGroupsSuccess, getGroupsError } from './actions';

export function* getUserSaga(action) {
  try {
    const user = yield call(getUser, action.resourceType, action.resourceId);
    yield put(getUserSuccess(user));
  } catch (err) {
    yield put(getUserError(err));
    yield put(showNotification(`Failed to users: ${getErrorDetail(err)}`));
  }
}

export function* saveUserSaga(action) {
  try {
    yield call(saveUser, action.userFormData);
    yield put(showNotification('Successfully create user account'));
    yield call(action.handleSubmitting);
    yield put(goBack());
  } catch (err) {
    yield put(showNotification(`Failed to create user: ${getErrorDetail(err)}`));
    yield call(action.handleSubmitting);
  }
}

export function* getGroupsSaga() {
  try {
    const groups = yield call(getGroups);
    yield put(getGroupsSuccess(groups));
  } catch (err) {
    yield put(getGroupsError(err));
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

export function* watchGetUserSaga() {
  yield takeLatest(GET_USER, getUserSaga);
}

export function* watchGetGroupsSaga() {
  yield takeLatest(GET_GROUPS, getGroupsSaga);
}

export function* watchSaveUserSaga() {
  yield takeLatest(SAVE_USER, saveUserSaga);
}


/**
 * Root saga manages watcher lifecycle
 */
export default function* rootSaga() {
  yield all([
    watchGetUserSaga(),
    watchSaveUserSaga(),
    watchGetGroupsSaga(),
  ]);
}
