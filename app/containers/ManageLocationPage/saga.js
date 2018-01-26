import { goBack } from 'react-router-redux';
import { takeLatest, call, put } from 'redux-saga/effects';
import { GET_LOCATION, POST_CREATE_LOCATION } from './constants';
import { createLocationError, createLocationSuccess, getLocationError, getLocationSuccess } from './actions';
import createLocaiton, { fetchLocation } from './api';


export function* handleCreateLocation(action) {
  try {
    const createLocationResponse = yield call(createLocaiton, action.location, action.organizationId);
    yield put(createLocationSuccess(createLocationResponse));
    yield put(goBack());
  } catch (err) {
    yield put(createLocationError(err));
  }
}


export function* handleGetLocation(action) {
  try {
    const location = yield call(fetchLocation, action.locationId);
    yield put(getLocationSuccess(location));
  } catch (error) {
    yield put(getLocationError(error));
  }
}

/**
 * Root saga manages watcher lifecycle
 */
export default function* watchCreateLocation() {
  yield takeLatest(POST_CREATE_LOCATION, handleCreateLocation);
  yield takeLatest(GET_LOCATION, handleGetLocation);
}
