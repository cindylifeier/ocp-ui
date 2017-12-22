import { call, put, select, takeLatest } from 'redux-saga/effects';
import { LOAD_PATIENT } from './constants';
import { makeSelectPatientId } from './selectors';
import { FhirService } from '../../utils/FhirService';
import { loadPatientError, loadPatientSuccess } from './actions';

export function* getPatient() {
  // Select patientId from store
  const patientId = yield select(makeSelectPatientId());
  const fhir = new FhirService();

  try {
    // Call FHIR service
    const patient = yield call(() => fhir.getPatient(patientId));
    yield put(loadPatientSuccess(patient));
  } catch (err) {
    yield put(loadPatientError(err));
  }
}

// Individual exports for testing
export default function* patientData() {
  yield takeLatest(LOAD_PATIENT, getPatient);
}
