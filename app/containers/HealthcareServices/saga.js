// import { take, call, put, select } from 'redux-saga/effects';

// Individual exports for testing
import { all, call, put, select, takeLatest } from 'redux-saga/effects';
import {
  GET_ACTIVE_HEALTHCARE_SERVICES,
  GET_FILTERED_HEALTHCARE_SERVICES, STATUS_ACTIVE, STATUS_INACTIVE,
} from './constants';
import { showNotification } from '../Notification/actions';
import queryHealthcareServices from './api';
import { makeSelectIncludeInactive, makeSelectOrganization } from './selectors';
import { getHealthcareServicesError, getHealthcareServicesSuccess } from './actions';

export function* fetchHealthcareServicesByOrganizationIdAndStatus(action) {
  try {
    const organization = yield select(makeSelectOrganization());
    const includeInactive = yield select(makeSelectIncludeInactive());
    const status = [];
    status.push(STATUS_ACTIVE);
    if (includeInactive) status.push(STATUS_INACTIVE);
    const healthCareServices = yield call(queryHealthcareServices, organization.id, status, action.currentPage);
    yield put(getHealthcareServicesSuccess(healthCareServices));
  } catch (err) {
    yield put(getHealthcareServicesError(err));
    yield put(showNotification('Failed to retrieve healthcare services, please try again.'));
  }
}

export function* watchActiveHealthCareServicesByOrganization() {
  yield takeLatest(GET_ACTIVE_HEALTHCARE_SERVICES, fetchHealthcareServicesByOrganizationIdAndStatus);
}

export function* watchFetchHealthCareServices() {
  yield takeLatest(GET_FILTERED_HEALTHCARE_SERVICES, fetchHealthcareServicesByOrganizationIdAndStatus);
}

export default function* rootSaga() {
  yield all([
    watchFetchHealthCareServices(),
    watchActiveHealthCareServicesByOrganization(),
  ]);
}
