import { all, call, put, select, takeLatest } from 'redux-saga/effects';
import { push } from 'react-router-redux';
import isEmpty from 'lodash/isEmpty';
import find from 'lodash/find';

import { showNotification } from '../Notification/actions';
import { HOME_URL } from '../App/constants';
import { GET_PATIENT } from './constants';
import { getPatientSuccess } from './actions';
import { makeSelectPatientSearchResult } from '../Patients/selectors';
import { getPatient } from '../ManagePatientPage/api';


export function* getPatientWorker({ patientId }) {
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
    yield put(push(HOME_URL));
  }
}

/**
 * Root saga manages watcher lifecycle
 */
export function* watchManageCareTeam() {
  yield takeLatest(GET_PATIENT, getPatientWorker);
}


function getPatientById(patients, patientId) {
  if (!isEmpty(patients)) {
    return find(patients, { id: patientId });
  }
  return null;
}


export default function* rootSaga() {
  yield all([
    watchManageCareTeam(),
  ]);
}
