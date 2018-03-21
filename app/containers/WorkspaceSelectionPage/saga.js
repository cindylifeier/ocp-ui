import { all, call, put, takeLatest } from 'redux-saga/effects';
import { showNotification } from 'containers/Notification/actions';
import {
  GET_CARE_COORDINATORS,
  GET_CARE_MANAGERS,
  GET_ORGANIZATIONS,
  GET_PATIENTS,
  GET_WORKFLOW_ROLES,
} from './constants';
import {
  getCareCoordinatorsSuccess,
  getCareManagersSuccess,
  getOrganizationsSuccess,
  getPatientsSuccess,
  getWorkflowRolesSuccess,
} from './actions';
import { getActiveOrganizations, getCareCoordinators, getCareManagers, getPatients, getWorkflowRoles } from './api';

export function* getWorkflowRolesSaga() {
  try {
    const workflowRoles = yield call(getWorkflowRoles);
    yield put(getWorkflowRolesSuccess(workflowRoles));
  } catch (err) {
    yield put(showNotification('Failed to get the workflow roles.'));
  }
}

export function* getOrganizationsSaga() {
  try {
    const organizations = yield call(getActiveOrganizations);
    yield put(getOrganizationsSuccess(organizations));
  } catch (err) {
    yield put(showNotification('Failed to get the organizations.'));
  }
}

export function* getCareManagersSaga({ role }) {
  try {
    const careManagers = yield call(getCareManagers, role);
    yield put(getCareManagersSuccess(careManagers));
  } catch (err) {
    yield put(showNotification('Failed to get the care managers.'));
  }
}

export function* getCareCoordinatorsSaga({ role }) {
  try {
    const careCoordinators = yield call(getCareCoordinators, role);
    yield put(getCareCoordinatorsSuccess(careCoordinators));
  } catch (err) {
    yield put(showNotification('Failed to get the care coordinators.'));
  }
}

export function* getPatientsSaga() {
  try {
    const patients = yield call(getPatients);
    yield put(getPatientsSuccess(patients));
  } catch (err) {
    yield put(showNotification('Failed to get the patients.'));
  }
}

export function* watchGetWorkflowRolesSaga() {
  yield takeLatest(GET_WORKFLOW_ROLES, getWorkflowRolesSaga);
}

export function* watchGetOrganizationsSaga() {
  yield takeLatest(GET_ORGANIZATIONS, getOrganizationsSaga);
}

export function* watchGetCareManagersSaga() {
  yield takeLatest(GET_CARE_MANAGERS, getCareManagersSaga);
}

export function* watchGetCareCoordinatorsSaga() {
  yield takeLatest(GET_CARE_COORDINATORS, getCareCoordinatorsSaga);
}

export function* watchGetPatientsSaga() {
  yield takeLatest(GET_PATIENTS, getPatientsSaga);
}

/**
 * Root saga manages watcher lifecycle
 */
export default function* rootSaga() {
  yield all([
    watchGetWorkflowRolesSaga(),
    watchGetOrganizationsSaga(),
    watchGetCareManagersSaga(),
    watchGetCareCoordinatorsSaga(),
    watchGetPatientsSaga(),
  ]);
}
