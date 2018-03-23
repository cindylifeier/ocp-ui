import { all, call, put, takeLatest } from 'redux-saga/effects';
import { GET_TODOS, GET_TODO_MAIN_TASK } from 'containers/Todos/constants';
import {
  getTodoError, getTodoSuccess, getTodoMainTaskError,
  getTodoMainTaskSuccess,
} from 'containers/Todos/actions';
import { showNotification } from 'containers/Notification/actions';
import { getTodos, getTodoMainTask } from './api';


export function* getTodosSaga(action) {
  try {
    const todos = yield call(getTodos, action.patientId, action.practitionerId, action.definition);
    yield put(getTodoSuccess(todos));
  } catch (error) {
    yield put(showNotification('Error in getting To Do.'));
    yield put(getTodoError(error));
  }
}


export function* getTodoMainTaskSaga(action) {
  try {
    const todoMainTask = yield call(getTodoMainTask, action.patientId, action.definition);
    yield put(getTodoMainTaskSuccess(todoMainTask));
  } catch (error) {
    yield put(showNotification('Error in getting To Do Task reference.'));
    yield put(getTodoMainTaskError(error));
  }
}


export function* watchGetTodosSaga() {
  yield takeLatest(GET_TODOS, getTodosSaga);
}

export function* watchGetTodoMainTaskSaga() {
  yield takeLatest(GET_TODO_MAIN_TASK, getTodoMainTaskSaga);
}

export default function* rootSaga() {
  yield all([
    watchGetTodosSaga(),
    watchGetTodoMainTaskSaga(),
  ]);
}
