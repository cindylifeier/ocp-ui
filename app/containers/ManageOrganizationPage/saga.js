import { call, put, takeLatest } from 'redux-saga/effects';
import { goBack } from 'react-router-redux';
import { CREATE_ORGANIZATION } from './constants';
import { showNotification } from '../Notification/actions';
import createOrganizationApiCall from './api';

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

export default function* watchCreateOrganization() {
  yield takeLatest(CREATE_ORGANIZATION, createOrganization);
}
