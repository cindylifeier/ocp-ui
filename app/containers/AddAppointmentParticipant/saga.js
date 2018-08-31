import { all, call, put, takeLatest } from 'redux-saga/effects';
import { goBack } from 'react-router-redux';
import isEmpty from 'lodash/isEmpty';

import { showNotification } from 'containers/Notification/actions';
import { getHealthcareService, getLocationReferences, getPractitionerReferences } from './api';
import {
  getHealthcareServiceReferencesSuccess,
  getLocationReferencesSuccess,
  getPractitionerReferencesSuccess,
} from './actions';
import { GET_HEALTHCARE_SERVICE_REFERENCES, GET_LOCATION_REFERENCES, GET_PRACTITIONER_REFERENCES } from './constants';

function* getHealthcareServiceSaga({ organizationId }) {
  try {
    if (!isEmpty(organizationId)) {
      const healthcareServices = yield call(getHealthcareService, organizationId);
      yield put(getHealthcareServiceReferencesSuccess(healthcareServices));
    }
  } catch (error) {
    yield put(showNotification('Error in getting Heathcare Service'));
    yield put(goBack());
  }
}

function* getLocationReferencesSaga({ healthcareServiceId }) {
  try {
    if (healthcareServiceId) {
      const locations = yield call(getLocationReferences, healthcareServiceId);
      yield put(getLocationReferencesSuccess(locations));
    }
  } catch (error) {
    yield put(showNotification('Error in getting Locations'));
    yield put(goBack());
  }
}

function* getPractitionerReferencesSaga({ organizationId, locationId }) {
  try {
    if (!isEmpty(organizationId) && !isEmpty(locationId)) {
      const practitioners = yield call(getPractitionerReferences, organizationId, locationId);
      yield put(getPractitionerReferencesSuccess(practitioners));
    }
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
