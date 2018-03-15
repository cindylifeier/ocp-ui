import { all, call, put, select, takeLatest } from 'redux-saga/effects';

import { showNotification } from 'containers/Notification/actions';
import { makeSelectOrganization } from 'containers/Context/selectors';
import {
  GET_HEALTHCARE_SERVICES_BY_LOCATION,
  GET_HEALTHCARE_SERVICES_BY_ORGANIZATION,
  STATUS_ACTIVE,
  STATUS_INACTIVE,
} from './constants';
import { getHealthcareServicesByLocation, getHealthcareServicesByOrganization } from './api';
import { makeSelectIncludeInactive, makeSelectLocation } from './selectors';
import { getHealthcareServicesError, getHealthcareServicesSuccess } from './actions';

export function* getHealthcareServicesByOrganizationSaga(action) {
  try {
    const organization = yield select(makeSelectOrganization());
    const includeInactive = yield select(makeSelectIncludeInactive());
    const status = [];
    status.push(STATUS_ACTIVE);
    if (includeInactive) status.push(STATUS_INACTIVE);
    const healthCareServices = yield call(getHealthcareServicesByOrganization, organization.id, status, action.currentPage);
    yield put(getHealthcareServicesSuccess(healthCareServices));
  } catch (err) {
    yield put(getHealthcareServicesError(err));
    yield put(showNotification('Failed to retrieve healthcare services, please try again.'));
  }
}

export function* getHealthcareServicesByLocationSaga(action) {
  try {
    const organization = yield select(makeSelectOrganization());
    const location = yield select(makeSelectLocation());
    const includeInactive = yield select(makeSelectIncludeInactive());
    const status = [];
    status.push(STATUS_ACTIVE);
    if (includeInactive) status.push(STATUS_INACTIVE);
    const healthCareServices = yield call(getHealthcareServicesByLocation, organization.id, location.id, status, action.currentPage);
    yield put(getHealthcareServicesSuccess(healthCareServices));
  } catch (err) {
    yield put(getHealthcareServicesError(err));
    yield put(showNotification('Failed to retrieve healthcare services, please try again.'));
  }
}

export function* watchGetHealthcareServicesByOrganizationSaga() {
  yield takeLatest(GET_HEALTHCARE_SERVICES_BY_ORGANIZATION, getHealthcareServicesByOrganizationSaga);
}

export function* watchGetHealthcareServicesByLocationSaga() {
  yield takeLatest(GET_HEALTHCARE_SERVICES_BY_LOCATION, getHealthcareServicesByLocationSaga);
}

export default function* rootSaga() {
  yield all([
    watchGetHealthcareServicesByOrganizationSaga(),
    watchGetHealthcareServicesByLocationSaga(),
  ]);
}
