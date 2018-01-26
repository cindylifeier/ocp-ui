// import { take, call, put, select } from 'redux-saga/effects'

// Individual exports for testing
import { call, put, takeLatest } from 'redux-saga/effects';
import { goBack } from 'react-router-redux';
import { SAVE_PATIENT } from './constants';
import { savePatientError } from './actions';
import postPatient from './api';
import { showNotification } from '../Notification/actions';


export function* savePatientWorker(action) {
  try {
    yield call(postPatient, action.patientFormData);
    yield put(showNotification('Successfully created the patient.'));
    yield call(action.handleSubmitting);
    yield put(goBack());
  } catch (error) {
    yield put(showNotification('Failed to create the patient.'));
    yield call(action.handleSubmitting);
    yield put(savePatientError(error));
  }
}

export default function* watchManagePatient() {
  yield takeLatest(SAVE_PATIENT, savePatientWorker);
}
