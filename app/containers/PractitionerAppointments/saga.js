import { makeSelectUser } from 'containers/App/contextSelectors';
import { showNotification } from 'containers/Notification/actions';
import { all, call, put, select, takeLatest } from 'redux-saga/effects';
import {
  cancelPractitionerAppointmentError,
  cancelPractitionerAppointmentSuccess,
  getPractitionerAppointmentsError,
  getPractitionerAppointmentsSuccess,
} from './actions';
import getPractitionerAppointmentsApi, { cancelAppointment } from './api';
import { CANCEL_PRACTITIONER_APPOINTMENT, GET_PRACTITIONER_APPOINTMENTS } from './constants';


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

export function* getPractitionerAppointmentsSaga({ query: { showPastAppointments, pageNumber } }) {
  try {
    let queryParams = {
      showPastAppointments,
      pageNumber,
    };
    const practitioner = yield select(makeSelectUser());
    const practitionerId = (practitioner && practitioner.fhirResource) ? practitioner.fhirResource.logicalId : null;

    if (practitionerId) {
      queryParams = {
        showPastAppointments,
        pageNumber,
        practitionerId,
        requesterReference: `Practitioner/${practitionerId}`,
      };
    }
    const practitionerAppointmentsPage = yield call(getPractitionerAppointmentsApi, queryParams);
    yield put(getPractitionerAppointmentsSuccess(practitionerAppointmentsPage));
  } catch (err) {
    const errMsg = getErrorMessage(err);
    yield put(getPractitionerAppointmentsError(err));
    yield put(showNotification(errMsg));
  }
}

export function* cancelPractitionerAppointmentSaga({ id }) {
  try {
    yield call(cancelAppointment, id);
    yield put(cancelPractitionerAppointmentSuccess(id));
    yield put(showNotification('Appointment is cancelled.'));
  } catch (err) {
    yield put(cancelPractitionerAppointmentError(err));
    yield put(showNotification('Failed to cancel appointment.'));
  }
}

export function* watchGetPractitionerAppointmentsSaga() {
  yield takeLatest(GET_PRACTITIONER_APPOINTMENTS, getPractitionerAppointmentsSaga);
}

export function* watchCancelPractitionerAppointmentSaga() {
  yield takeLatest(CANCEL_PRACTITIONER_APPOINTMENT, cancelPractitionerAppointmentSaga);
}

export default function* rootSaga() {
  yield all([
    watchGetPractitionerAppointmentsSaga(),
    watchCancelPractitionerAppointmentSaga(),
  ]);
}

