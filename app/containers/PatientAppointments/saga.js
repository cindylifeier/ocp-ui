import { makeSelectPatient, makeSelectUser } from 'containers/App/contextSelectors';
import { showNotification } from 'containers/Notification/actions';
import { all, call, put, select, takeLatest } from 'redux-saga/effects';
import {
  cancelPatientAppointmentError,
  cancelPatientAppointmentSuccess,
  getPatientAppointmentsError,
  getPatientAppointmentsSuccess,
} from './actions';
import getPatientAppointmentsApi, { cancelAppointment } from './api';
import { CANCEL_PATIENT_APPOINTMENT, GET_PATIENT_APPOINTMENTS } from './constants';

function getErrorMessage(err) {
  let errorMessage = '';
  if (err && err.message === 'Failed to fetch') {
    errorMessage = 'Failed to retrieve the appointment list. Server is offline.';
  } else if (err && err.response && err.response.status === 404) {
    errorMessage = 'No appointments to show.';
  } else if (err && err.response && err.response.status === 500) {
    errorMessage = 'Failed to retrieve the appointment list. Unknown server error.';
  } else {
    errorMessage = 'Failed to retrieve the appointment list. Unknown error.';
  }
  return errorMessage;
}

export function* getPatientAppointmentsSaga({ query: { showPastAppointments, pageNumber } }) {
  try {
    let queryParams = {
      showPastAppointments,
      pageNumber,
    };
    const patient = yield select(makeSelectPatient());
    const practitioner = yield select(makeSelectUser());
    const patientId = patient ? patient.id : null;
    const practitionerId = (practitioner && practitioner.resource) ? practitioner.resource.logicalId : null;

    if (patientId && practitionerId) {
      queryParams = {
        showPastAppointments,
        pageNumber,
        patientId,
        practitionerId,
      };
    } else if (patientId) {
      queryParams = {
        showPastAppointments,
        pageNumber,
        patientId,
      };
    } else if (practitionerId) {
      queryParams = {
        showPastAppointments,
        pageNumber,
        practitionerId,
      };
    }
    const patientAppointmentsPage = yield call(getPatientAppointmentsApi, queryParams);
    yield put(getPatientAppointmentsSuccess(patientAppointmentsPage));
  } catch (err) {
    const errMsg = getErrorMessage(err);
    yield put(getPatientAppointmentsError(err));
    yield put(showNotification(errMsg));
  }
}

export function* cancelPatientAppointmentSaga({ id }) {
  try {
    yield call(cancelAppointment, id);
    yield put(cancelPatientAppointmentSuccess(id));
    yield put(showNotification('Appointment is cancelled.'));
  } catch (err) {
    yield put(cancelPatientAppointmentError(err));
    yield put(showNotification('Failed to cancel appointment.'));
  }
}

export function* watchGetPatientAppointmentsSaga() {
  yield takeLatest(GET_PATIENT_APPOINTMENTS, getPatientAppointmentsSaga);
}

export function* watchCancelPatientAppointmentSaga() {
  yield takeLatest(CANCEL_PATIENT_APPOINTMENT, cancelPatientAppointmentSaga);
}

// Individual exports for testing
export default function* defaultSaga() {
  yield all([
    watchGetPatientAppointmentsSaga(),
    watchCancelPatientAppointmentSaga(),
  ]);
}
