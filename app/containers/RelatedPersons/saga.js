import { all, call, put, takeLatest } from 'redux-saga/effects';


import { showNotification } from '../Notification/actions';
import { saveRelatedPersonsError, getRelatedPersonsSuccess } from './actions';
import { getRelatedPersons } from './api';
import { GET_RELATED_PERSONS } from './constants';

export function* getRelatedPersonSaga(action) {
  try {
    const relatedPersons = yield call(getRelatedPersons, action.patientId, action.showInActive, action.pageNumber);
    yield put(getRelatedPersonsSuccess(relatedPersons));
  } catch (error) {
    yield put(showNotification('Error in getting related persons.'));
    yield put(saveRelatedPersonsError(error));
  }
}


export function* watchGetRelatedPersonsSaga() {
  yield takeLatest(GET_RELATED_PERSONS, getRelatedPersonSaga);
}

export default function* rootSaga() {
  yield all([
    watchGetRelatedPersonsSaga(),
  ]);
}
