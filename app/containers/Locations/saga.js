
import { call, put, takeLatest, select } from 'redux-saga/effects';
import {
  GET_ACTIVE_LOCATIONS,
  GET_FILTERED_LOCATIONS,
}
from './constants';
import { getLocationsError, getLocationsSuccess } from './actions';
import { makeSelectOrganization } from './selectors';
import LocationService from './LocationService';

/**
 * Get locations by Organization id and status
 * @params action: the action whick contains the status and organization id in the payload
 */
export function* fetchLocationsByOrganizationIdAndStatus(action) {
  try {
    const organization = yield select(makeSelectOrganization());
    let locations;
    if (action.status) {
      locations = yield call(LocationService.getLocationsByIdAndStatus, organization.id, action.status, action.currentPage);
    } else if (!action.status) {
      locations = yield call(LocationService.getLocationsByIdAndStatus, organization.id, [], action.currentPage);
    }
    yield put(getLocationsSuccess(locations));
  } catch (err) {
    yield put(getLocationsError(err));
  }
}

/**
 * Root saga manages watcher lifecycle
 */
export default function* watchFetchLocations() {
  yield takeLatest(GET_ACTIVE_LOCATIONS, fetchLocationsByOrganizationIdAndStatus);
  yield takeLatest(GET_FILTERED_LOCATIONS, fetchLocationsByOrganizationIdAndStatus);
}
