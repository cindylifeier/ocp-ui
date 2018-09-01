import { all, call, put, takeLatest } from 'redux-saga/effects';
import { goBack } from 'react-router-redux';

import { showNotification } from 'containers/Notification/actions';
import { getHealthcareServiceReferences, getLocationReferences, getPractitionerReferences } from './api';
import {
  getHealthcareServiceReferencesSuccess,
  getLocationReferencesSuccess,
  getPractitionerReferencesSuccess,
} from './actions';
import { GET_HEALTHCARE_SERVICE_REFERENCES, GET_LOCATION_REFERENCES, GET_PRACTITIONER_REFERENCES } from './constants';

function* getHealthcareServiceSaga({ resourceType, resourceValue }) {
  try {
    const healthcareServices = yield call(getHealthcareServiceReferences, resourceType, resourceValue);
    yield put(getHealthcareServiceReferencesSuccess(healthcareServices));
  } catch (error) {
    yield put(showNotification('Error in getting Healthcare Service'));
    yield put(goBack());
  }
}

function* getLocationReferencesSaga({ resourceType, resourceValue }) {
  try {
    const locations = yield call(getLocationReferences, resourceType, resourceValue);
    yield put(getLocationReferencesSuccess(locations));
  } catch (error) {
    yield put(showNotification('Error in getting Locations'));
    yield put(goBack());
  }
}

function* getPractitionerReferencesSaga({ resourceType, resourceValue }) {
  try {
    const practitioners = yield call(getPractitionerReferences, resourceType, resourceValue);
    yield put(getPractitionerReferencesSuccess(practitioners));
  } catch (error) {
    yield put(showNotification('Error in getting practitioners'));
    yield put(goBack());
  }
}

function* watchGetHealthcareServiceSaga() {
  yield takeLatest(GET_HEALTHCARE_SERVICE_REFERENCES, getHealthcareServiceSaga);
}

function* watchGetLocationReferencesSaga() {
  yield takeLatest(GET_LOCATION_REFERENCES, getLocationReferencesSaga);
}

function* watchGetPractitionerReferencesSaga() {
  yield takeLatest(GET_PRACTITIONER_REFERENCES, getPractitionerReferencesSaga);
}

export default function* rootSaga() {
  yield all([
    watchGetHealthcareServiceSaga(),
    watchGetLocationReferencesSaga(),
    watchGetPractitionerReferencesSaga(),
  ]);
}
