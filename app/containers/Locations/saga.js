
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
export function* getLocationsByOrganizationIdAndStatus(action) {
  try {
    const organization = yield select(makeSelectOrganization());
    let locations;
    if (action.status) {
      locations = yield call(LocationService.getLocationsByIdAndStatus, organization.id, action.status);
    } else if (!action.status) {
      locations = yield call(LocationService.getLocationsByIdAndStatus, organization.id, []);
    }
    yield put(getLocationsSuccess(locations));
  } catch (err) {
    yield put(getLocationsError(err));
  }
}

/**
 * Root saga manages watcher lifecycle
 */
export default function* getLocations() {
  yield takeLatest(GET_ACTIVE_LOCATIONS, getLocationsByOrganizationIdAndStatus);
  yield takeLatest(GET_FILTERED_LOCATIONS, getLocationsByOrganizationIdAndStatus);
}
