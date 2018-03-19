import { all, call, put, select, takeLatest } from 'redux-saga/effects';
import isEmpty from 'lodash/isEmpty';

import { showNotification } from 'containers/Notification/actions';
import { makeSelectLocation, makeSelectOrganization } from 'containers/App/contextSelectors';
import { GET_HEALTHCARE_SERVICES, STATUS_ACTIVE, STATUS_INACTIVE } from './constants';
import { getHealthcareServicesByLocation, getHealthcareServicesByOrganization } from './api';
import { makeSelectIncludeInactive } from './selectors';
import { getHealthcareServicesError, getHealthcareServicesSuccess } from './actions';

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

export function* watchGetHealthcareServicesByOrganizationSaga() {
  yield takeLatest(GET_HEALTHCARE_SERVICES, getHealthcareServicesSaga);
}

export default function* rootSaga() {
  yield all([
    watchGetHealthcareServicesByOrganizationSaga(),
  ]);
}
