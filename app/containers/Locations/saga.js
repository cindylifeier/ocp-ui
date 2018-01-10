
import { call, put, takeLatest } from 'redux-saga/effects';
import {
  GET_ACTIVE_LOCATIONS,
  LOCATION_TABLE_HEADERS,
  GET_FILTERED_LOCATIONS }
from './constants';
import { getLocationError, getLocationsSuccess } from './actions';
import { ApiService } from '../../utils/ApiService';

/**
 * Get locations by Organization id
 * @params action: the action
 */
export function* getLocationsByOrganizationId(action) {
  try {
    const locations = yield call(ApiService.getLocationsById, action.organizationId);
    yield put(getLocationsSuccess(locations, LOCATION_TABLE_HEADERS));
  } catch (err) {
    yield put(getLocationError(err));
  }
}

export function* getLocationsByOrganizationIdAndStatus(action) {
  try {
    const locations = yield call(ApiService.getLocationsByIdAndStatus, action.organizationId, action.status);
    yield put(getLocationsSuccess(locations, LOCATION_TABLE_HEADERS));
  } catch (err) {
    yield put(getLocationError(err));
  }
}

/**
 * Root saga manages watcher lifecycle
 */
export default function* getLocations() {
  // Watches for GET_ACTIVE_LOCATIONS actions and calls getLocationsByOrganizationId when one comes in.
  // By using `takeLatest` only the result of the latest API call is applied.
  // It returns task descriptor (just like fork) so we can continue execution
  // It will be cancelled automatically on component unmount
  yield takeLatest(GET_ACTIVE_LOCATIONS, getLocationsByOrganizationId);
  yield takeLatest(GET_FILTERED_LOCATIONS, getLocationsByOrganizationIdAndStatus);
}
