import { all, call, put, select, takeEvery, takeLatest } from 'redux-saga/effects';
import isEmpty from 'lodash/isEmpty';
import { push } from 'react-router-redux';

import { getLookupTypesNotInStore } from 'utils/LookupService';
import { makeSelectPatientSearchResult } from 'containers/Patients/selectors';
import { showNotification } from 'containers/Notification/actions';
import { fetchLookups, getPatient, getPatientById } from './api';
import { GET_LOOKUPS, GET_PATIENT, PATIENTS_URL } from './constants';
import { getLookupsError, getLookupsFromStore, getLookupsSuccess, getPatientSuccess } from './actions';


export function* getLookups(action) {
  try {
    const lookupTypesNotInStore = yield getLookupTypesNotInStore(action);
    if (lookupTypesNotInStore.length > 0) {
      const lookups = yield call(fetchLookups, lookupTypesNotInStore);
      yield put(getLookupsSuccess(lookups));
    } else {
      yield put(getLookupsFromStore());
    }
  } catch (err) {
    yield put(getLookupsError(err));
  }
}


function* getPatientSaga({ patientId }) {
  try {
    let patient;
    // Load patients from store
    const patients = yield select(makeSelectPatientSearchResult());
    patient = getPatientById(patients, patientId);
    // fetch from backend if cannot find patient from store
    if (isEmpty(patient)) {
      patient = yield call(getPatient, patientId);
    }
    yield put(getPatientSuccess(patient));
  } catch (error) {
    yield put(showNotification('No match patient found.'));
    yield put(push(PATIENTS_URL));
    throw error;
  }
}


export function* watchGetLookupsSaga() {
  yield takeEvery(GET_LOOKUPS, getLookups);
}


function* watchGetPatientSaga() {
  yield takeLatest(GET_PATIENT, getPatientSaga);
}

export default function* rootSaga() {
  yield all([
    watchGetLookupsSaga(),
    watchGetPatientSaga(),
  ]);
}
