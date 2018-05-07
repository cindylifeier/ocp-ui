import { call, put, takeLatest, all } from 'redux-saga/effects';
import { GET_ACTORS, getActorsError, getActorsSuccess } from './constants';
import { getActors } from './api';
import { showNotification } from './actions';

export function* getActorsSaga(action) {
  try {
    if (action.patientId) {
      const recipients = yield call(getActors, action.patientId);
      yield put(getActorsSuccess(recipients));
    }
  } catch (error) {
    yield put(showNotification('No Actors found!!!'));
    yield put(getActorsError(error));
  }
}

export function* watchGetActorsSaga() {
  yield takeLatest(GET_ACTORS, getActorsSaga);
}

export default function* rootSaga() {
  yield all([
    watchGetActorsSaga(),
  ]);
}
