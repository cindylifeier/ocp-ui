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

function* getCareTeamSaga({ careTeamId }) {
  try {
    let careTeam;
    // Load careTeams from store
    const careTeamsSelector = yield select(makeSelectCareTeams());
    const careTeams = careTeamsSelector && careTeamsSelector.data && careTeamsSelector.data.elements;
    careTeam = getCareTeamById(careTeams, careTeamId);
    // fetch from backend if cannot find care team from store
    if (isEmpty(careTeam)) {
      careTeam = yield call(getCareTeam, careTeamId);
    }
    yield put(getCareTeamSuccess(careTeam));
  } catch (error) {
    yield put(showNotification('No match care team found.'));
    yield put(push(PATIENTS_URL));
    throw error;
  }
}

function* saveCareTeamSaga(action) {
  try {
    yield call(saveCareTeam, action.careTeamFormData);
    yield put(showNotification(`Successfully ${determineNotificationForSavingCareTeam(action.careTeamFormData)} the care team.`));
    yield call(action.handleSubmitting);
    yield put(goBack());
  } catch (error) {
    yield put(showNotification(`Failed to ${determineNotificationForSavingCareTeam(action.careTeamFormData)} the care team.`));
    yield call(action.handleSubmitting);
    throw error;
  }
}

function* watchGetPatientSaga() {
  yield takeLatest(GET_PATIENT, getPatientSaga);
}

function* watchGetCareTeamSaga() {
  yield takeLatest(GET_CARE_TEAM, getCareTeamSaga);
}

function* watchManageCareTeamSaga() {
  yield takeLatest(SAVE_CARE_TEAM, saveCareTeamSaga);
}

/**
 * Root saga manages watcher lifecycle
 */
export default function* rootSaga() {
  yield all([
    watchGetPatientSaga(),
    watchGetCareTeamSaga(),
    watchManageCareTeamSaga(),
  ]);
}
