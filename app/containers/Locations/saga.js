
import { call, put, takeLatest } from 'redux-saga/effects';
import { GET_LOCATIONS, LOCATION_TABLE_HEADERS } from './constants';
import { getLocationError, getLocationSuccess } from './actions';
import { ApiService } from '../../utils/ApiService';

/**
 * Get locations by Organization id
 * @params action: the action
 */
export function* getLocationsByOrganizationId(action) {
  try {
    const locations = yield call(ApiService.getLocationsById, action.organizationId);
    yield put(getLocationSuccess(locations, LOCATION_TABLE_HEADERS));
  } catch (err) {
    yield put(getLocationError(err));
  }
}

/**
 * Root saga manages watcher lifecycle
 */
export default function* getLocations() {
  // Watches for GET_LOCATIONS actions and calls getLocationsByOrganizationId when one comes in.
  // By using `takeLatest` only the result of the latest API call is applied.
  // It returns task descriptor (just like fork) so we can continue execution
  // It will be cancelled automatically on component unmount
  yield takeLatest(GET_LOCATIONS, getLocationsByOrganizationId);
}
