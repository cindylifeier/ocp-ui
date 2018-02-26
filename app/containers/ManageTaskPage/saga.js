import { all, call, put, select, takeLatest } from 'redux-saga/effects';
import { goBack, push } from 'react-router-redux';
import isEmpty from 'lodash/isEmpty';

import { showNotification } from '../Notification/actions';
import { PATIENTS_URL } from '../App/constants';
import { GET_ORGANIZATION, GET_PATIENT, GET_ACTIVITY_DEFINITIONS, GET_PRACTITIONERS, CREATE_TASK } from './constants';
import { getOrganizationError, getOrganizationSuccess, getPatientSuccess, getActivityDefinitionsError, getActivityDefinitionsSuccess, getPractitionersSuccess, getPractitionersError, createTaskSuccess, createTaskError } from './actions';
import { makeSelectPatientSearchResult } from '../Patients/selectors';
import { getPatient } from '../ManagePatientPage/api';
import { getPatientById, getOrganization, getActivityDefinitions, getPractitioners, createTask } from './api';

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

function* watchGetPatientSaga() {
  yield takeLatest(GET_PATIENT, getPatientSaga);
}

export function* getOrganizationSaga() {
  try {
    const organization = yield call(getOrganization);
    yield put(getOrganizationSuccess(organization));
  } catch (err) {
    yield put(getOrganizationError(err));
  }
}

/**
 * Root saga manages watcher lifecycle
 */
export function* watchGetOrganizationSaga() {
  yield takeLatest(GET_ORGANIZATION, getOrganizationSaga);
}

export function* getActivityDefinitionsSaga(organizationId) {
  try {
    const activityDefinitions = yield call(getActivityDefinitions, organizationId);
    yield put(getActivityDefinitionsSuccess(activityDefinitions));
  } catch (err) {
    yield put(getActivityDefinitionsError(err));
  }
}

/**
 * Root saga manages watcher lifecycle
 */
export function* watchGetActivityDefinitionsSaga() {
  yield takeLatest(GET_ACTIVITY_DEFINITIONS, getActivityDefinitionsSaga);
}

export function* getPractitionersSaga() {
  try {
    const practitioners = yield call(getPractitioners);
    yield put(getPractitionersSuccess(practitioners));
  } catch (err) {
    yield put(getPractitionersError(err));
  }
}

/**
 * Root saga manages watcher lifecycle
 */
export function* watchGetPractitionersSaga() {
  yield takeLatest(GET_PRACTITIONERS, getPractitionersSaga);
}

function* createTaskSaga(action) {
  try {
    const createTaskResponse = yield call(createTask, action.taskFormData);
    yield put(createTaskSuccess(createTaskResponse));
    yield put(showNotification('Successfully create the Task Resource.'));
    yield call(action.handleSubmitting);
    yield put(goBack());
  } catch (error) {
    yield put(showNotification(`Failed to create the Task Resource.${getErrorDetail(error)}`));
    yield call(action.handleSubmitting);
    yield put(createTaskError(error));
  }
}

function* watchCreateTaskSaga() {
  yield takeLatest(CREATE_TASK, createTaskSaga);
}

function getErrorDetail(err) {
  let errorDetail = '';
  if (err && err.message === 'Failed to fetch') {
    errorDetail = ' Server is offline.';
  } else if (err && err.response && err.response.status === 409) {
    errorDetail = ' Duplicate Entry:: Same Category and Type already exists.';
  } else if (err && err.response && err.response.status === 500) {
    errorDetail = ' Unknown server error.';
  }
  return errorDetail;
}

/**
 * Root saga manages watcher lifecycle
 */
export default function* rootSaga() {
  yield all([
    watchGetPatientSaga(),
    watchGetOrganizationSaga(),
    watchGetActivityDefinitionsSaga(),
    watchGetPractitionersSaga(),
    watchCreateTaskSaga(),
  ]);
}
