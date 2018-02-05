import { all, call, put, select, takeLatest } from 'redux-saga/effects';
import { goBack, push } from 'react-router-redux';
import isEmpty from 'lodash/isEmpty';

import { showNotification } from '../Notification/actions';
import { PATIENTS_URL } from '../App/constants';
import { GET_CARE_TEAM, GET_PATIENT, SAVE_CARE_TEAM } from './constants';
import { getCareTeamSuccess, getPatientSuccess } from './actions';
import { makeSelectPatientSearchResult } from '../Patients/selectors';
import makeSelectCareTeams from '../CareTeams/selectors';
import { getPatient } from '../ManagePatientPage/api';
import {
  determineNotificationForSavingCareTeam,
  getCareTeam,
  getCareTeamById,
  getPatientById,
  saveCareTeam,
} from './api';

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

function* getCareTeamWorker({ careTeamId }) {
  try {
    let careTeam;
    // Load careTeams from store
    const careTeams = yield select(makeSelectCareTeams());
    careTeam = getCareTeamById(careTeams, careTeamId);
    // fetch from backend if cannot find care team from store
    if (isEmpty(careTeam)) {
      careTeam = yield call(getCareTeam, careTeamId);
    }
    yield put(getCareTeamSuccess(careTeam));
  } catch (error) {
    yield put(showNotification('No match care team found.'));
    yield put(push(PATIENTS_URL));
  }
}

function* saveCareTeamWorker(action) {
  try {
    yield call(saveCareTeam, action.careTeamFormData);
    yield put(showNotification(`Successfully ${determineNotificationForSavingCareTeam(action.careTeamFormData)} the care team.`));
    yield call(action.handleSubmitting);
    yield put(goBack());
  } catch (error) {
    yield put(showNotification(`Failed to ${determineNotificationForSavingCareTeam(action.careTeamFormData)} the care team.`));
    yield call(action.handleSubmitting);
  }
}

function* watchGetPatient() {
  yield takeLatest(GET_PATIENT, getPatientWorker);
}

function* watchGetCareTeam() {
  yield takeLatest(GET_CARE_TEAM, getCareTeamWorker);
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
    watchGetCareTeam(),
    watchManageCareTeam(),
  ]);
}
