import { all, call, put, select, takeLatest } from 'redux-saga/effects';

import { showNotification } from 'containers/Notification/actions';
import { makeSelectPatient } from 'containers/App/contextSelectors';
import getTasksApi, { cancelTask } from './api';
import { cancelTaskError, cancelTaskSuccess, getTasksError, getTasksSuccess } from './actions';
import { CANCEL_TASK, GET_TASKS } from './constants';

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

export function* getTasksSaga({ pageNumber }) {
  try {
    const patient = yield select(makeSelectPatient());
    if (!patient || !patient.id) {
      yield put(showNotification('No patient is selected.'));
    } else {
      const { id } = patient;
      const tasksPage = yield call(getTasksApi, id, pageNumber);
      yield put(getTasksSuccess(tasksPage));
    }
  } catch (err) {
    const errMsg = getErrorMessage(err);
    yield put(getTasksError(errMsg));
  }
}

export function* cancelTaskSaga({ id }) {
  try {
    yield call(cancelTask, id);
    yield put(cancelTaskSuccess(id));
    yield put(showNotification('Task is cancelled.'));
  } catch (err) {
    yield put(cancelTaskError(err));
    yield put(showNotification('Failed to cancel task.'));
  }
}

export function* watchGetTasksSaga() {
  yield takeLatest(GET_TASKS, getTasksSaga);
}

export function* watchCancelTaskSaga() {
  yield takeLatest(CANCEL_TASK, cancelTaskSaga);
}

export default function* rootSaga() {
  yield all([
    watchGetTasksSaga(),
    watchCancelTaskSaga(),
  ]);
}
