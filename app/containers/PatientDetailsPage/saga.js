import { call, put, select, takeLatest } from 'redux-saga/effects';
import { LOAD_PATIENT } from './constants';
import { makeSelectPatientId } from './selectors';
import { FhirService } from '../../utils/FhirService';
import { loadPatientError, loadPatientSuccess } from './actions';

export function* fetchPatientData() {
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

/**
 * Root saga manages watcher lifecycle
 */
export default function* watchFetchPatientData() {
  yield takeLatest(LOAD_PATIENT, fetchPatientData);
}
