import { all, call, put, takeLatest } from 'redux-saga/effects';
import { searchOrganizations } from 'containers/Organizations/api';
import { showNotification } from 'containers/Notification/actions';
import {
  GET_CARE_COORDINATORS,
  GET_CARE_MANAGERS,
  GET_PRACTITIONERS_ON_ROLE_ORGANIZATION,
  GET_WORKFLOW_ROLES,
  SEARCH_ORGANIZATIONS,
  SEARCH_PATIENTS,
} from './constants';
import {
  getCareCoordinatorsSuccess,
  getCareManagersSuccess,
  getPractitionersOnRoleOrganizationSuccess,
  getWorkflowRolesSuccess,
  searchOrganizationsError,
  searchOrganizationsSuccess,
  searchPatientsError,
  searchPatientsSuccess,
} from './actions';
import {
  getCareCoordinators,
  getCareManagers,
  getPractitionersOnRoleOrganization,
  getWorkflowRoles,
  searchPatients,
} from './api';

export function* getWorkflowRolesSaga() {
  try {
    const workflowRoles = yield call(getWorkflowRoles);
    yield put(getWorkflowRolesSuccess(workflowRoles));
  } catch (err) {
    yield put(showNotification('Failed to get the workflow roles.'));
  }
}

export function* getPractitionersOnRoleOrganizationSaga({ role, organization, currentPage }) {
  try {
    const practitioners = yield call(getPractitionersOnRoleOrganization, role, organization, currentPage);
    yield put(getPractitionersOnRoleOrganizationSuccess(role, practitioners));
  } catch (err) {
    yield put(showNotification('Failed to get practitioners.'));
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

export function* searchPatientsSaga({ searchValue, showInactive, searchType, currentPage }) {
  try {
    const patients = yield call(searchPatients, searchValue, showInactive, searchType, currentPage);
    yield put(searchPatientsSuccess(patients));
  } catch (err) {
    yield put(searchPatientsError(err.message));
  }
}

export function* searchOrganizationsSaga({ searchValue, showInactive, searchType, currentPage }) {
  try {
    const organizations = yield call(searchOrganizations, searchValue, showInactive, searchType, currentPage);
    yield put(searchOrganizationsSuccess(organizations));
  } catch (err) {
    yield put(searchOrganizationsError(err.message));
  }
}

export function* watchGetWorkflowRolesSaga() {
  yield takeLatest(GET_WORKFLOW_ROLES, getWorkflowRolesSaga);
}

export function* watchGetPractitionersOnRoleOrganizationSaga() {
  yield takeLatest(GET_PRACTITIONERS_ON_ROLE_ORGANIZATION, getPractitionersOnRoleOrganizationSaga);
}

export function* watchSearchOrganizationsSaga() {
  yield takeLatest(SEARCH_ORGANIZATIONS, searchOrganizationsSaga);
}

export function* watchGetCareManagersSaga() {
  yield takeLatest(GET_CARE_MANAGERS, getCareManagersSaga);
}

export function* watchGetCareCoordinatorsSaga() {
  yield takeLatest(GET_CARE_COORDINATORS, getCareCoordinatorsSaga);
}

export function* watchSearchPatientsSaga() {
  yield takeLatest(SEARCH_PATIENTS, searchPatientsSaga);
}

/**
 * Root saga manages watcher lifecycle
 */
export default function* rootSaga() {
  yield all([
    watchGetWorkflowRolesSaga(),
    watchGetPractitionersOnRoleOrganizationSaga(),
    watchSearchOrganizationsSaga(),
    watchGetCareManagersSaga(),
    watchGetCareCoordinatorsSaga(),
    watchSearchPatientsSaga(),
  ]);
}
