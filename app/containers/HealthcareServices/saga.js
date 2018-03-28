import { all, call, put, select, takeLatest } from 'redux-saga/effects';
import isEmpty from 'lodash/isEmpty';

import { showNotification } from 'containers/Notification/actions';
import { makeSelectLocation, makeSelectOrganization } from 'containers/App/contextSelectors';
import { GET_HEALTHCARE_SERVICES, SEARCH_HEALTHCARE_SERVICES, STATUS_ACTIVE, STATUS_INACTIVE } from 'containers/HealthcareServices//constants';
import { makeSelectIncludeInactive } from 'containers/HealthcareServices//selectors';
import {
  getHealthcareServicesError,
  getHealthcareServicesSuccess,
  searchHealthcareServicesSuccess,
  searchHealthcareServicesError,
} from 'containers/HealthcareServices/actions';
import { getErrorDetail, searchHealthcareServices, getHealthcareServicesByLocation, getHealthcareServicesByOrganization } from 'containers/HealthcareServices/api';

export function* getHealthcareServicesSaga(action) {
  try {
    const organization = yield select(makeSelectOrganization());
    const location = yield select(makeSelectLocation());
    const includeInactive = yield select(makeSelectIncludeInactive());
    const status = [];
    status.push(STATUS_ACTIVE);
    if (includeInactive) status.push(STATUS_INACTIVE);
    let healthCareServices = null;
    if (!isEmpty(organization) && !isEmpty(organization.logicalId) && (isEmpty(location) || isEmpty(location.logicalId))) {
      healthCareServices = yield call(getHealthcareServicesByOrganization, organization.logicalId, status, action.currentPage);
    }
    if (!isEmpty(organization) && !isEmpty(organization.logicalId) && !isEmpty(location) && !isEmpty(location.logicalId)) {
      healthCareServices = yield call(getHealthcareServicesByLocation, organization.logicalId, location.logicalId, status, action.currentPage);
    }
    yield put(getHealthcareServicesSuccess(healthCareServices));
  } catch (err) {
    yield put(getHealthcareServicesError(err));
    yield put(showNotification('Failed to retrieve healthcare services, please try again.'));
  }
}

export function* searchHealthcareServicesSaga({ searchType, searchValue, includeInactive, currentPage }) {
  try {
    const organization = yield select(makeSelectOrganization());
    const location = yield select(makeSelectLocation());
    let healthcareServices = null;
    if (!isEmpty(organization) && !isEmpty(organization.logicalId) && (isEmpty(location) || isEmpty(location.logicalId))) {
      healthcareServices = yield call(searchHealthcareServices, organization.logicalId, searchType, searchValue, includeInactive, currentPage);
    }
    yield put(searchHealthcareServicesSuccess(healthcareServices));
  } catch (error) {
    yield put(searchHealthcareServicesError(getErrorDetail(error)));
  }
}

export function* watchGetHealthcareServicesByOrganizationSaga() {
  yield takeLatest(GET_HEALTHCARE_SERVICES, getHealthcareServicesSaga);
}

export function* watchSearchHealthcareServicesSaga() {
  yield takeLatest(SEARCH_HEALTHCARE_SERVICES, searchHealthcareServicesSaga);
}

export default function* rootSaga() {
  yield all([
    watchGetHealthcareServicesByOrganizationSaga(),
    watchSearchHealthcareServicesSaga(),
  ]);
}
