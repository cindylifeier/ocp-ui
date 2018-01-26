import { all, call, put, takeLatest } from 'redux-saga/effects';
import { goBack } from 'react-router-redux';
import { CREATE_ORGANIZATION, UPDATE_ORGANIZATION } from './constants';
import { showNotification } from '../Notification/actions';
import { createOrganizationApiCall, updateOrganizationApiCall } from './api';

export function* createOrganization(action) {
  try {
    yield call(createOrganizationApiCall, action.organization);
    yield put(showNotification('Successfully created the organization.'));
    yield call(action.callback);
    yield put(goBack());
  } catch (err) {
    yield put(showNotification('Failed to create the organization.'));
    yield call(action.callback);
  }
}

export function* updateOrganization(action) {
  try {
    yield call(updateOrganizationApiCall, action.id, action.organization);
    yield put(showNotification('Successfully updated the organization.'));
    yield call(action.callback);
    yield put(goBack());
  } catch (err) {
    yield put(showNotification('Failed to update the organization.'));
    yield call(action.callback);
  }
}


export function* watchCreateOrganization() {
  yield takeLatest(CREATE_ORGANIZATION, createOrganization);
}

export function* watchUpdateOrganization() {
  yield takeLatest(UPDATE_ORGANIZATION, updateOrganization);
}

export default function* rootSaga() {
  yield all([
    watchCreateOrganization(),
    watchUpdateOrganization(),
  ]);
}
