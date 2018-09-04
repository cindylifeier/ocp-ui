import { all, call, put, takeLatest } from 'redux-saga/effects';
import { showNotification } from 'containers/Notification/actions';
import { getCommunicationsByAppointment } from 'utils/CommunicationUtils';
import getTasksApi, { cancelTask } from './api';
import { cancelTaskError, cancelTaskSuccess, getTasksError, getTasksSuccess,
  getTaskRelatedCommunicationsError, getTaskRelatedCommunicationsSuccess,
} from './actions';
import { CANCEL_TASK, GET_TASKS, GET_TASK_RELATED_COMMUNICATIONS } from './constants';

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

export function* getTasksSaga({ practitionerId, patientId, statusList }) {
  try {
    const tasksPage = yield call(getTasksApi, practitionerId, patientId, statusList);
    yield put(getTasksSuccess(tasksPage));
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


export function* getTaskRelatedCommunicationsSaga({ patient, taskId, pageNumber }) {
  try {
    const communications = yield call(getCommunicationsByAppointment, patient, taskId, pageNumber, 'Task');
    yield put(getTaskRelatedCommunicationsSuccess(communications));
  } catch (err) {
    const errMsg = getErrorMessage(err);
    yield put(getTaskRelatedCommunicationsError(err));
    yield put(showNotification(errMsg));
  }
}

export function* watchGetTasksSaga() {
  yield takeLatest(GET_TASKS, getTasksSaga);
}

export function* watchCancelTaskSaga() {
  yield takeLatest(CANCEL_TASK, cancelTaskSaga);
}

export function* watchGetTaskRelatedCommunicationsSaga() {
  yield takeLatest(GET_TASK_RELATED_COMMUNICATIONS, getTaskRelatedCommunicationsSaga);
}

export default function* rootSaga() {
  yield all([
    watchGetTasksSaga(),
    watchCancelTaskSaga(),
    watchGetTaskRelatedCommunicationsSaga(),
  ]);
}
