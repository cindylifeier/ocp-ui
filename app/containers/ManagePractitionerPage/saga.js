import { call, put, takeLatest } from 'redux-saga/effects';
import { push } from 'react-router-redux';
import { savePractitionerError } from './actions';
import { SAVE_PRACTITIONER } from './constants';
import createPractitioner from './api';

export function* createPractitionerWorker({ practitionerFormData }) {
  try {
    yield call(createPractitioner, practitionerFormData);
    yield put(push('/home'));
  } catch (error) {
    yield put(savePractitionerError(error));
  }
}

/**
 * Root saga manages watcher lifecycle
 */
export default function* watchSavePractitioner() {
  yield takeLatest(SAVE_PRACTITIONER, createPractitionerWorker);
}
