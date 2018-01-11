
import { call, put, takeLatest, select } from 'redux-saga/effects';
import {
  GET_ACTIVE_LOCATIONS,
  GET_FILTERED_LOCATIONS,
}
from './constants';
import { getLocationsError, getLocationsSuccess } from './actions';
import { ApiService } from '../../utils/ApiService';
import { makeSelectOrganizationId } from './selectors';

/**
 * Get locations by Organization id and status
 * @params action: the action whick contains the status and organization id in the payload
 */
export function* getLocationsByOrganizationIdAndStatus(action) {
  try {
    const organizationId = yield select(makeSelectOrganizationId());
    const locations = yield call(ApiService.getLocationsByIdAndStatus, organizationId, action.status);
    yield put(getLocationsSuccess(locations, action.organizationId));
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
