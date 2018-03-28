import { all, call, put, takeLatest } from 'redux-saga/effects';
import { showNotification } from 'containers/Notification/actions';
import searchPatients from 'containers/Patients/api';
import {
  GET_CARE_COORDINATORS,
  GET_CARE_MANAGERS,
  GET_ORGANIZATIONS,
  GET_WORKFLOW_ROLES,
  SEARCH_PATIENT,
} from './constants';
import {
  getCareCoordinatorsSuccess,
  getCareManagersSuccess,
  getOrganizationsSuccess,
  getWorkflowRolesSuccess,
  searchPatientError,
  searchPatientSuccess,
} from './actions';
import { getActiveOrganizations, getCareCoordinators, getCareManagers, getWorkflowRoles } from './api';

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

export function* getCareManagersSaga({ role, organization }) {
  try {
    const careManagers = yield call(getCareManagers, role, organization);
    yield put(getCareManagersSuccess(careManagers));
  } catch (err) {
    yield put(showNotification('Failed to get the care managers.'));
  }
}

export function* getCareCoordinatorsSaga({ role, organization }) {
  try {
    const careCoordinators = yield call(getCareCoordinators, role, organization);
    yield put(getCareCoordinatorsSuccess(careCoordinators));
  } catch (err) {
    yield put(showNotification('Failed to get the care coordinators.'));
  }
}

export function* searchPatientSaga({ searchType, searchValue, includeInactive, currentPage }) {
  try {
    const patients = yield call(searchPatients, searchType, searchValue, includeInactive, currentPage);
    yield put(searchPatientSuccess(patients));
  } catch (err) {
    yield put(searchPatientError(err.message));
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

export function* watchSearchPatientSaga() {
  yield takeLatest(SEARCH_PATIENT, searchPatientSaga);
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
    watchSearchPatientSaga(),
  ]);
}
