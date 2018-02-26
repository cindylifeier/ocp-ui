// import { take, call, put, select } from 'redux-saga/effects';

// Individual exports for testing
import { all, call, put, select, takeEvery, takeLatest } from 'redux-saga/effects';
import {
  GET_HEALTHCARE_SERVICES_LOCATION_ASSIGNMENT,
  STATUS_ACTIVE, UNASSIGN_HEALTHCARE_SERVICES_LOCATION_ASSIGNMENT,
  UPDATE_HEALTHCARE_SERVICES_LOCATION_ASSIGNMENT,
} from './constants';
import { showNotification } from '../Notification/actions';
import {
  queryHealthCareServicesWithLocationAssignmentData, assignHealthCareServicesToLocation,
  unassignHealthCareServicesToLocation,
} from './api';
import { makeSelectLocation, makeSelectOrganization } from './selectors';
import {
  getHealthcareServicesLocationAssignmentServicesError,
  getHealthcareServicesLocationAssignmentSuccess, markHealthcareServiceAsAssigned,
  unassignHealthcareServicesLocationAssignmentServicesError,
  unmarkHealthcareServiceAsAssigned,
  updateHealthcareServicesLocationAssignmentServicesError,
} from './actions';

export function* getHealthcareServicesLocationAssignmentSaga(action) {
  try {
    const organization = yield select(makeSelectOrganization());
    const location = yield select(makeSelectLocation());
    const status = [];
    status.push(STATUS_ACTIVE);
    const healthCareServices = yield call(queryHealthCareServicesWithLocationAssignmentData, organization.id, location.id, action.currentPage, status);
    yield put(getHealthcareServicesLocationAssignmentSuccess(healthCareServices));
  } catch (err) {
    yield put(getHealthcareServicesLocationAssignmentServicesError(err));
    yield put(showNotification('Failed to retrieve healthcare services, please try again.'));
  }
}

export function* updateHealthcareServicesLocationAssignmentSaga(action) {
  try {
    const locationIds = [];
    locationIds.push(action.locationId);
    yield call(assignHealthCareServicesToLocation, action.organizationId, locationIds, action.healthcareServiceId);
    yield put(markHealthcareServiceAsAssigned(action.healthcareServiceId));
    yield put(showNotification('The healthcare service is successfully assigned to current location.'));
  } catch (err) {
    yield put(updateHealthcareServicesLocationAssignmentServicesError(err));
    yield put(showNotification('Failed to assign he healthcare services to the current location. Please try again.'));
  }
}

export function* watchGetHealthcareServicesLocationAssignmentSaga() {
  yield takeLatest(GET_HEALTHCARE_SERVICES_LOCATION_ASSIGNMENT, getHealthcareServicesLocationAssignmentSaga);
}

export function* watchUpdateHealthcareServicesLocationAssignmentSaga() {
  yield takeEvery(UPDATE_HEALTHCARE_SERVICES_LOCATION_ASSIGNMENT, updateHealthcareServicesLocationAssignmentSaga);
}

export function* unassignHealthcareServicesLocationAssignmentSaga(action) {
  try {
    const locationIds = [];
    locationIds.push(action.locationId);
    yield call(unassignHealthCareServicesToLocation, action.organizationId, locationIds, action.healthcareServiceId);
    yield put(unmarkHealthcareServiceAsAssigned(action.healthcareServiceId));
    yield put(showNotification('The healthcare service is successfully unassigned from the current location.'));
  } catch (err) {
    yield put(unassignHealthcareServicesLocationAssignmentServicesError(err));
    yield put(showNotification('Failed to unassign the healthcare services from the current location. Please try again.'));
  }
}

export function* watchUnassignHealthcareServicesLocationAssignmentSaga() {
  yield takeEvery(UNASSIGN_HEALTHCARE_SERVICES_LOCATION_ASSIGNMENT, unassignHealthcareServicesLocationAssignmentSaga);
}

export default function* rootSaga() {
  yield all([
    watchGetHealthcareServicesLocationAssignmentSaga(),
    watchUpdateHealthcareServicesLocationAssignmentSaga(),
    watchUnassignHealthcareServicesLocationAssignmentSaga(),
  ]);
}
