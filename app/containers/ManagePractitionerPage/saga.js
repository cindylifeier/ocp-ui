import { call, put, takeLatest } from 'redux-saga/effects';
import { goBack } from 'react-router-redux';
import { savePractitionerError } from './actions';
import { SAVE_PRACTITIONER } from './constants';
import createPractitioner from './api';
import { showNotification } from '../Notification/actions';

export function* createPractitionerWorker({ practitionerFormData }) {
  try {
    yield call(createPractitioner, practitionerFormData);
    yield put(showNotification('Successfully created the practitioner.'));
    yield put(goBack());
  } catch (error) {
    yield put(showNotification('Failed to create the practitioner.'));
    yield put(savePractitionerError(error));
  }
}

/**
 * Root saga manages watcher lifecycle
 */
export default function* watchSavePractitioner() {
  yield takeLatest(SAVE_PRACTITIONER, createPractitionerWorker);
}
