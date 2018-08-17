import { all, call, put, select, takeLatest } from 'redux-saga/effects';
import isEmpty from 'lodash/isEmpty';
import { goBack } from 'react-router-redux';
import { showNotification } from 'containers/Notification/actions';
import { makeSelectPatient } from 'containers/App/contextSelectors';
import {
  GET_CARE_TEAM_REFERENCES,
  GET_HEALTHCARE_SERVICE_REFERENCES,
  GET_LOCATION_REFERENCES, GET_PRACTITIONER_REFERENCES,
  SEARCH_APPOINTMENT_PARTICIPANT,
} from 'containers/SearchAppointmentParticipant/constants';
import {
  getHealthcareService,
  getPractitionerReferences,
  getLocationReferences,
  getCareTeamReferences,
  searchAppointmentParticipant,
} from 'containers/SearchAppointmentParticipant/api';
import {

  getCareTeamReferencesSuccess,
  getHealthcareServiceReferencesSuccess,
  getLocationReferencesSuccess,
  getPractitionerReferencesSuccess,
  getSearchAppointmentParticipantError,
  getSearchAppointmentParticipantSuccess,
} from 'containers/SearchAppointmentParticipant/actions';

export function* searchAppointmentParticipantSaga(action) {
  const patient = yield select(makeSelectPatient());
  try {
    if (!isEmpty(action.member) && !isEmpty(patient) && !isEmpty(patient.id)) {
      const participants = yield call(searchAppointmentParticipant, action.name, action.member, patient.id);
      yield put(getSearchAppointmentParticipantSuccess(participants));
    }
  } catch (error) {
    yield put(showNotification('No participant found'));
    yield put(getSearchAppointmentParticipantError(error));
  }
}


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


function* getCareTeamReferencesSaga({ patientId }) {
  try {
    if (!isEmpty(patientId)) {
      const careTeams = yield call(getCareTeamReferences, patientId);
      yield put(getCareTeamReferencesSuccess(careTeams));
    }
  } catch (error) {
    yield put(showNotification('Error in getting care teams'));
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

function* watchGetCareTeamReferencesSaga() {
  yield takeLatest(GET_CARE_TEAM_REFERENCES, getCareTeamReferencesSaga);
}


export function* watchSearchAppointmentParticipantSaga() {
  yield takeLatest(SEARCH_APPOINTMENT_PARTICIPANT, searchAppointmentParticipantSaga);
}

export default function* rootSaga() {
  yield all([
    watchSearchAppointmentParticipantSaga(),
    watchGetHealthcareServiceSaga(),
    watchGetLocationReferencesSaga(),
    watchGetPractitionerReferencesSaga(),
    watchGetCareTeamReferencesSaga(),
  ]);
}
