import { all, call, put, select, takeLatest } from 'redux-saga/effects';
import {
  GET_ACTIVE_LOCATIONS, GET_FILTERED_LOCATIONS, STATUS_ACTIVE, STATUS_INACTIVE,
  STATUS_SUSPENDED } from './constants';
import { getLocationsError, getLocationsSuccess } from './actions';
import { makeSelectIncludeInactive, makeSelectIncludeSuspended, makeSelectOrganization } from './selectors';
import searchLocationsByIdAndStatus from './api';

/**
 * Get locations by Organization id and status
 * @params action: the action whick contains the status and organization id in the payload
 */
export function* fetchLocationsByOrganizationIdAndStatus(action) {
  try {
    const organization = yield select(makeSelectOrganization());
    const includeInactive = yield select(makeSelectIncludeInactive());
    const includeSuspended = yield select(makeSelectIncludeSuspended());
    const status = [];
    status.push(STATUS_ACTIVE);
    if (includeInactive) status.push(STATUS_INACTIVE);
    if (includeSuspended) status.push(STATUS_SUSPENDED);
    const locations = yield call(searchLocationsByIdAndStatus, organization.id, status, action.currentPage);
    yield put(getLocationsSuccess(locations, includeInactive, includeSuspended));
  } catch (err) {
    yield put(getLocationsError(err));
  }
}

/**
 * Root saga manages watcher lifecycle
 */
export function* watchFetchLocations() {
  yield takeLatest(GET_ACTIVE_LOCATIONS, fetchLocationsByOrganizationIdAndStatus);
}

export function* watchFilterLocations() {
  yield takeLatest(GET_FILTERED_LOCATIONS, fetchLocationsByOrganizationIdAndStatus);
}


export default function* rootSaga() {
  yield all([
    watchFetchLocations(),
    watchFilterLocations(),
  ]);
}
