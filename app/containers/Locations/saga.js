
// import { put, takeLatest } from 'redux-saga/effects';
// import { GET_LOCATIONS, LOCATIONS } from './constants';
// import { getLocationError, getLocationSuccess } from './actions';

/**
 * getLocationsByOrganizationId locations request/response handler
 */
export function* getLocationsByOrganizationId() {
  // try {
  //   yield put(getLocationSuccess(LOCATIONS));
  // } catch (err) {
  //   yield put(getLocationError(err));
  // }
}

/**
 * Root saga manages watcher lifecycle
 */
export default function* getLocations() {
  // Watches for GET_LOCATIONS actions and calls getLocationsByOrganizationId when one comes in.
  // By using `takeLatest` only the result of the latest API call is applied.
  // It returns task descriptor (just like fork) so we can continue execution
  // It will be cancelled automatically on component unmount
  // yield takeLatest(GET_LOCATIONS, getLocationsByOrganizationId);
}
