import { goBack } from 'react-router-redux';
import { takeLatest, call, put } from 'redux-saga/effects';
import { POST_CREATE_LOCATION } from './constants';
import { createLocationError, createLocationSuccess } from './actions';
import createLocaiton from './api';


export function* handleCreateLocation(action) {
  try {
    const createLocationResponse = yield call(createLocaiton, action.location, action.organizationId);
    yield put(createLocationSuccess(createLocationResponse));
    yield put(goBack());
  } catch (err) {
    yield put(createLocationError(err));
  }
}


/**
 * Root saga manages watcher lifecycle
 */
export default function* watchCreateLocation() {
  yield takeLatest(POST_CREATE_LOCATION, handleCreateLocation);
}
