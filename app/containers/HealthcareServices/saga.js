// import { take, call, put, select } from 'redux-saga/effects';

// Individual exports for testing
import { all, call, put, select, takeLatest } from 'redux-saga/effects';
import { GET_HEALTHCARE_SERVICES_BY_ORGANIZATION, STATUS_ACTIVE, STATUS_INACTIVE } from './constants';
import { showNotification } from '../Notification/actions';
import { queryHealthcareServicesByOrganization } from './api';
import { makeSelectIncludeInactive, makeSelectOrganization } from './selectors';
import { getHealthcareServicesError, getHealthcareServicesSuccess } from './actions';

export function* getHealthcareServicesByOrganizationIdAndStatusSaga(action) {
  try {
    const organization = yield select(makeSelectOrganization());
    const includeInactive = yield select(makeSelectIncludeInactive());
    const status = [];
    status.push(STATUS_ACTIVE);
    if (includeInactive) status.push(STATUS_INACTIVE);
    const healthCareServices = yield call(queryHealthcareServicesByOrganization, organization.id, status, action.currentPage);
    yield put(getHealthcareServicesSuccess(healthCareServices));
  } catch (err) {
    yield put(getHealthcareServicesError(err));
    yield put(showNotification('Failed to retrieve healthcare services, please try again.'));
  }
}

export function* watchGetHealthcareServicesByOrganizationSaga() {
  yield takeLatest(GET_HEALTHCARE_SERVICES_BY_ORGANIZATION, getHealthcareServicesByOrganizationIdAndStatusSaga);
}

export default function* rootSaga() {
  yield all([
    watchGetHealthcareServicesByOrganizationSaga(),
  ]);
}
