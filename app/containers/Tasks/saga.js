// import { take, call, put, select } from 'redux-saga/effects';

import { all, call, put, takeLatest } from 'redux-saga/effects';
import getTasksApi from './api';
import { showNotification } from '../Notification/actions';
import { getTasksError, getTasksSuccess } from './actions';
import { GET_TASKS } from './constants';

function getErrorMessage(err) {
  let errorMessage = '';
  if (err && err.message === 'Failed to fetch') {
    errorMessage = 'Failed to retrieve patient\'s tasks. Server is offline.';
  } else if (err && err.response && err.response.status === 404) {
    errorMessage = 'The patient does not have any tasks.';
  } else if (err && err.response && err.response.status === 500) {
    errorMessage = 'Failed to retrieve patient\'s tasks. Unknown server error.';
  } else {
    errorMessage = 'Failed to retrieve patient\'s tasks. Unknown error.';
  }
  return errorMessage;
}

export function* getTasks({ query }) {
  try {
    const tasksPage = yield call(getTasksApi, query);
    yield put(getTasksSuccess(tasksPage));
  } catch (err) {
    const errMsg = getErrorMessage(err);
    yield put(getTasksError(err));
    yield put(showNotification(errMsg));
  }
}

export function* watchGetTasks() {
  yield takeLatest(GET_TASKS, getTasks);
}

export default function* rootSaga() {
  yield all([
    watchGetTasks(),
  ]);
}
