import { all, call, put, takeLatest } from 'redux-saga/effects';
import { GET_TO_DOS, GET_TO_DO_MAIN_TASK } from 'containers/ToDos/constants';
import {
  getToDoError, getToDoSuccess, getToDoMainTaskError,
  getToDoMainTaskSuccess,
} from 'containers/ToDos/actions';
import { showNotification } from 'containers/Notification/actions';
import { getToDos, getToDoMainTask } from './api';


export function* getToDosSaga(action) {
  try {
    const toDos = yield call(getToDos, action.patientId, action.practitionerId, action.definition);
    yield put(getToDoSuccess(toDos));
  } catch (error) {
    yield put(showNotification('Error in getting To Do.'));
    yield put(getToDoError(error));
  }
}


export function* getToDoMainTaskSaga(action) {
  try {
    const toDoMainTask = yield call(getToDoMainTask, action.patientId, action.definition);
    yield put(getToDoMainTaskSuccess(toDoMainTask));
  } catch (error) {
    yield put(showNotification('Error in getting To Do Task reference.'));
    yield put(getToDoMainTaskError(error));
  }
}


export function* watchGetToDosSaga() {
  yield takeLatest(GET_TO_DOS, getToDosSaga);
}

export function* watchGetToDoMainTaskSaga() {
  yield takeLatest(GET_TO_DO_MAIN_TASK, getToDoMainTaskSaga);
}

export default function* rootSaga() {
  yield all([
    watchGetToDosSaga(),
    watchGetToDoMainTaskSaga(),
  ]);
}
