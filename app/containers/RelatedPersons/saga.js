import { all, call, put, takeLatest } from 'redux-saga/effects';


import { showNotification } from '../Notification/actions';
import { getRelatedPersonsError, getRelatedPersonsSuccess } from './actions';
import { getRelatedPersons } from './api';
import { GET_RELATED_PERSONS } from './constants';

export function* getRelatedPersonWorker(action) {
  try {
    const relatedPersons = yield call(getRelatedPersons, action.patientId, action.showInActive, action.pageNumber);
    yield put(getRelatedPersonsSuccess(relatedPersons));
  } catch (error) {
    yield put(showNotification('Error in getting related persons.'));
    yield put(getRelatedPersonsError(error));
  }
}


export function* watchGetRelatedPersons() {
  yield takeLatest(GET_RELATED_PERSONS, getRelatedPersonWorker);
}

export default function* rootSaga() {
  yield all([
    watchGetRelatedPersons(),
  ]);
}
