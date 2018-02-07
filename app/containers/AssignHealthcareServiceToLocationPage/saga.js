// import { take, call, put, select } from 'redux-saga/effects';

// Individual exports for testing

import { all, call, put, select, takeLatest } from 'redux-saga/effects';
import { showNotification } from '../Notification/actions';
import queryHealthCareServicesWithLocationAssignmentData from './api';
import { GET_ACTIVE_HEALTHCARE_SERVICES, GET_FILTERED_HEALTHCARE_SERVICES } from '../HealthcareServices/constants';
import { STATUS_ACTIVE } from './constants';
import { makeSelectLocations, makeSelectOrganization } from '../Locations/selectors';
import {
  getHealthcareLocationAssignmentServicesError,
  getHealthcareServicesLocationAssignmentSuccess,
} from './actions';


export function* getHealthcareServicesByOrganizationIdAndStatus(action) {
  try {
    const organization = yield select(makeSelectOrganization());
    const selectedLocation = yield select(makeSelectLocations());
    const status = [];
    status.push(STATUS_ACTIVE);
    const healthCareServicesWithLocationAssignment = yield call(queryHealthCareServicesWithLocationAssignmentData, organization.id, selectedLocation.id, action.currentPage);
    yield put(getHealthcareServicesLocationAssignmentSuccess(healthCareServicesWithLocationAssignment));
  } catch (err) {
    yield put(getHealthcareLocationAssignmentServicesError(err));
    yield put(showNotification('Failed to retrieve healthcare services, please try again.'));
  }
}

export function* watchGetActiveHealthCareServicesByOrganization() {
  yield takeLatest(GET_ACTIVE_HEALTHCARE_SERVICES, getHealthcareServicesByOrganizationIdAndStatus);
}

export function* watchGetHealthCareServices() {
  yield takeLatest(GET_FILTERED_HEALTHCARE_SERVICES, getHealthcareServicesByOrganizationIdAndStatus);
}

export default function* rootSaga() {
  yield all([
    watchGetHealthCareServices(),
    watchGetActiveHealthCareServicesByOrganization(),
  ]);
}

