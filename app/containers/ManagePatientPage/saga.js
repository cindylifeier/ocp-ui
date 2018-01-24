// import { take, call, put, select } from 'redux-saga/effects'

// Individual exports for testing
import { call, put, takeLatest } from 'redux-saga/effects';
import { push } from 'react-router-redux';
import { SAVE_PATIENT } from './constants';
import { savePatientError } from './actions';
import postPatient from './api';


export function* savePatientWorker({ patientFormData }) {
  try {
    yield call(postPatient, patientFormData);
    yield put(push('/home'));
  } catch (error) {
    yield put(savePatientError(error));
  }
}

export default function* watchManagePatient() {
  yield takeLatest(SAVE_PATIENT, savePatientWorker);
}
