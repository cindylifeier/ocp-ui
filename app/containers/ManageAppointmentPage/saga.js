import { showNotification } from 'containers/Notification/actions';
import { makeSelectPatientAppointments } from 'containers/PatientAppointments/selectors';
import { makeSelectPractitionerAppointments } from 'containers/PractitionerAppointments/selectors';
import isEmpty from 'lodash/isEmpty';
import isUndefined from 'lodash/isUndefined';
import { goBack } from 'react-router-redux';
import { all, call, put, select, takeLatest } from 'redux-saga/effects';
import {
  getAppointmentSuccess,
  getHealthcareServiceReferencesSuccess,
  getLocationReferencesSuccess,
  getPractitionerReferencesSuccess,
  getCareTeamReferencesSuccess,
} from './actions';
import {
  getAppointmentApi,
  getAppointmentById,
  saveAppointment,
  getHealthcareService,
  getLocationReferences,
  getPractitionerReferences,
  getCareTeamReferences,
} from './api';
import {
  GET_APPOINTMENT,
  SAVE_APPOINTMENT,
  GET_HEALTHCARE_SERVICE_REFERENCES,
  GET_LOCATION_REFERENCES,
  GET_PRACTITIONER_REFERENCES,
  GET_CARE_TEAM_REFERENCES,
} from './constants';

function* saveAppointmentSaga(action) {
  try {
    yield call(saveAppointment, action.appointment);
    yield put(showNotification(`Successfully ${determineNotificationForAppointmentInPastTense(action.appointment)} the appointment.`));
    yield call(action.handleSubmitting);
    yield put(goBack());
  } catch (error) {
    yield put(showNotification(`Failed to ${determineNotificationForAppointment(action.appointment)} the appointment.`));
    yield call(action.handleSubmitting);
  }
}

function* watchSaveAppointmentSaga() {
  yield takeLatest(SAVE_APPOINTMENT, saveAppointmentSaga);
}

function* getAppointmentSaga({ appointmentId }) {
  try {
    let appointment;
    // Load appointments from store
    let appointmentsSelector = yield select(makeSelectPatientAppointments());
    if (isUndefined(appointmentsSelector)) {
      appointmentsSelector = yield select(makeSelectPractitionerAppointments());
    }
    const appointments = appointmentsSelector && appointmentsSelector.data && appointmentsSelector.data.elements;
    appointment = getAppointmentById(appointments, appointmentId);
    // Fetch from backend if Appointment is not found in the store
    if (isEmpty(appointment)) {
      appointment = yield call(getAppointmentApi, appointmentId);
    }
    yield put(getAppointmentSuccess(appointment));
  } catch (error) {
    yield put(showNotification('No matching appointment found.'));
    yield put(goBack());
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

function* watchGetAppointmentSaga() {
  yield takeLatest(GET_APPOINTMENT, getAppointmentSaga);
}

function* watchGetCareTeamReferencesSaga() {
  yield takeLatest(GET_CARE_TEAM_REFERENCES, getCareTeamReferencesSaga);
}

export function determineNotificationForAppointment(appointmentFormData) {
  let action = 'create';
  if (appointmentFormData.appointmentId) {
    action = 'edit';
  }
  return action;
}

export function determineNotificationForAppointmentInPastTense(appointmentFormData) {
  let action = 'created';
  if (appointmentFormData.appointmentId) {
    action = 'edited';
  }
  return action;
}

export default function* rootSaga() {
  yield all([
    watchSaveAppointmentSaga(),
    watchGetAppointmentSaga(),
    watchGetHealthcareServiceSaga(),
    watchGetLocationReferencesSaga(),
    watchGetPractitionerReferencesSaga(),
    watchGetCareTeamReferencesSaga(),
  ]);
}
