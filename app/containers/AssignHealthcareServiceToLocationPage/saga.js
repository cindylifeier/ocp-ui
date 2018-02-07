// import { take, call, put, select } from 'redux-saga/effects';

// Individual exports for testing
import { call, put, select, takeLatest } from 'redux-saga/effects';
import {
  GET_HEALTHCARE_SERVICES_LOCATION_ASSIGNMENT,
  STATUS_ACTIVE,
  STATUS_INACTIVE,
} from './constants';
import { showNotification } from '../Notification/actions';
import queryHealthCareServicesWithLocationAssignmentData from './api';
import { makeSelectLocation, makeSelectIncludeInactive, makeSelectOrganization } from './selectors';
import {
  getHealthcareServicesLocationAssignmentServicesError,
  getHealthcareServicesLocationAssignmentSuccess,
} from './actions';

export function* getHealthcareServicesLocationAssignmentSaga(action) {
  try {
    const organization = yield select(makeSelectOrganization());
    const location = yield select(makeSelectLocation());
    const includeInactive = yield select(makeSelectIncludeInactive());
    const status = [];
    status.push(STATUS_ACTIVE);
    if (includeInactive) status.push(STATUS_INACTIVE);
    const healthCareServices = yield call(queryHealthCareServicesWithLocationAssignmentData, organization.id, location.id, action.currentPage, status);
    yield put(getHealthcareServicesLocationAssignmentSuccess(healthCareServices));
  } catch (err) {
    yield put(getHealthcareServicesLocationAssignmentServicesError(err));
    yield put(showNotification('Failed to retrieve healthcare services, please try again.'));
  }
}

export default function* rootSaga() {
  yield takeLatest(GET_HEALTHCARE_SERVICES_LOCATION_ASSIGNMENT, getHealthcareServicesLocationAssignmentSaga);
}
