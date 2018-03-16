import { all, call, put, takeLatest } from 'redux-saga/effects';
import { GET_TODOS } from 'containers/Todos/constants';
import { getTodoError, getTodoSuccess } from 'containers/Todos/actions';
import { showNotification } from '../Notification/actions';
import { getTodos } from './api';

export function* getTodosSaga(action) {
  try {
    const todos = yield call(getTodos, action.patientId, action.definition, action.pageNumber);
    yield put(getTodoSuccess(todos));
  } catch (error) {
    yield put(showNotification('Error in getting To Do.'));
    yield put(getTodoError(error));
  }
}

export function* watchGetTodosSaga() {
  yield takeLatest(GET_TODOS, getTodosSaga);
}

export default function* rootSaga() {
  yield all([
    watchGetTodosSaga(),
  ]);
}
