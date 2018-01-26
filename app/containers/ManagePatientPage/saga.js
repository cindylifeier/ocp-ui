// import { take, call, put, select } from 'redux-saga/effects'

// Individual exports for testing
import { call, put, takeLatest } from 'redux-saga/effects';
import { goBack } from 'react-router-redux';
import { SAVE_PATIENT } from './constants';
import { savePatientError } from './actions';
import { postPatient, putPatient } from './api';
import { showNotification } from '../Notification/actions';


export function* savePatientWorker(action) {
  try {
    if (action.patientFormData.id) {
      yield call(putPatient, action.patientFormData);
    } else {
      yield call(postPatient, action.patientFormData);
    }
    yield put(showNotification(`Successfully ${getNotificationAction(action.patientFormData)} the patient.`));
    yield call(action.handleSubmitting);
    yield put(goBack());
  } catch (error) {
    yield put(showNotification(`Failed to ${getNotificationAction(action.patientFormData)} the patient.`));
    yield call(action.handleSubmitting);
    yield put(savePatientError(error));
  }
}

export default function* watchManagePatient() {
  yield [
    takeLatest(SAVE_PATIENT, savePatientWorker),
  ];
}

function getNotificationAction(patientFormData) {
  let action = 'create';
  if (patientFormData.id) {
    action = 'edit';
  }
  return action;
}
