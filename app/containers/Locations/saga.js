
import { call, put, takeLatest, select } from 'redux-saga/effects';
import {
  GET_ACTIVE_LOCATIONS,
  LOCATION_TABLE_HEADERS,
  GET_FILTERED_LOCATIONS,
}
from './constants';
import { getLocationError, getLocationsSuccess } from './actions';
import { ApiService } from '../../utils/ApiService';
import { makeSelectOrganizationId } from './selectors';

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
    const organizationId = yield select(makeSelectOrganizationId());
    const locations = yield call(ApiService.getLocationsByIdAndStatus, organizationId, action.status);
    yield put(getLocationsSuccess(locations, action.organizationId));
  } catch (err) {
    yield put(getLocationError(err));
  }
}

/**
 * Root saga manages watcher lifecycle
 */
export default function* getLocations() {
  yield takeLatest(GET_ACTIVE_LOCATIONS, getLocationsByOrganizationIdAndStatus);
  yield takeLatest(GET_FILTERED_LOCATIONS, getLocationsByOrganizationIdAndStatus);
}
