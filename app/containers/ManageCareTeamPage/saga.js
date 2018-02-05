import { all, call, put, select, takeLatest } from 'redux-saga/effects';
import { goBack, push } from 'react-router-redux';
import isEmpty from 'lodash/isEmpty';

import { showNotification } from '../Notification/actions';
import { PATIENTS_URL } from '../App/constants';
import { GET_PATIENT, SAVE_CARE_TEAM } from './constants';
import { getPatientSuccess } from './actions';
import { makeSelectPatientSearchResult } from '../Patients/selectors';
import { getPatient } from '../ManagePatientPage/api';
import { createCareTeam, getPatientById } from './api';

function* getPatientWorker({ patientId }) {
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
  }
}

function* saveCareTeamWorker(action) {
  try {
    yield call(createCareTeam, action.careTeamFormData);
    yield put(showNotification('Successfully create the care team.'));
    yield call(action.handleSubmitting);
    yield put(goBack());
  } catch (error) {
    yield put(showNotification('Failed to create the care team.'));
    yield call(action.handleSubmitting);
  }
}

function* watchGetPatient() {
  yield takeLatest(GET_PATIENT, getPatientWorker);
}

function* watchManageCareTeam() {
  yield takeLatest(SAVE_CARE_TEAM, saveCareTeamWorker);
}

/**
 * Root saga manages watcher lifecycle
 */
export default function* rootSaga() {
  yield all([
    watchGetPatient(),
    watchManageCareTeam(),
  ]);
}
