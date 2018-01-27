import { goBack } from 'react-router-redux';
import { call, put, takeLatest } from 'redux-saga/effects';
import { GET_LOCATION, POST_CREATE_LOCATION, PUT_LOCATION } from './constants';
import {
  createLocationError, createLocationSuccess, getLocationError, getLocationSuccess, putLocationError,
  putLocationSuccess,
} from './actions';
import createLocaiton, { fetchLocation, updateLocation } from './api';
import { showNotification } from '../Notification/actions';


export function* handleCreateLocation(action) {
  try {
    const createLocationResponse = yield call(createLocaiton, action.location, action.organizationId);
    yield put(createLocationSuccess(createLocationResponse));
    yield put(showNotification('Successfully created the location.'));
    yield put(goBack());
  } catch (err) {
    yield put(showNotification('Failed to create the location.'));
    yield put(createLocationError(err));
  }
}

export function* handleUpdateLocation(action) {
  try {
    const response = yield call(updateLocation, action.location, action.organizationId);
    yield put(putLocationSuccess(response));
    yield put(showNotification('Successfully updating the location.'));
    yield put(goBack());
  } catch (err) {
    yield put(showNotification('Failed to update the location.'));
    yield put(putLocationError(err));
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
  yield takeLatest(PUT_LOCATION, handleUpdateLocation);
  yield takeLatest(GET_LOCATION, handleGetLocation);
}
