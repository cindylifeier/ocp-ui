import { showNotification } from 'containers/Notification/actions';
import {
  cancelAppointmentError,
  cancelAppointmentSuccess,
  getUpcomingAppointmentsError,
  getUpcomingAppointmentsSuccess,
} from 'containers/UpcomingAppointments/actions';
import getUpcomingAppointmentsApi, { cancelAppointment } from 'containers/UpcomingAppointments/api';
import { CANCEL_APPOINTMENT, GET_UPCOMING_APPOINTMENTS } from 'containers/UpcomingAppointments/constants';
import { all, call, put, takeLatest } from 'redux-saga/effects';


function getErrorMessage(err) {
  let errorMessage = '';
  if (err && err.message === 'Failed to fetch') {
    errorMessage = 'Failed to retrieve patient\'s upcoming appointments. Server is offline.';
  } else if (err && err.response && err.response.status === 404) {
    errorMessage = 'Not have any upcoming appointments..';
  } else if (err && err.response && err.response.status === 500) {
    errorMessage = 'Failed to retrieve patient\'s upcoming appointments. Unknown server error.';
  } else {
    errorMessage = 'Failed to retrieve patient\'s upcoming appointments.. Unknown error.';
  }
  return errorMessage;
}

export function* getUpcomingAppointmentsSaga({ query }) {
  try {
    const upcomingAppointmentsPage = yield call(getUpcomingAppointmentsApi, query);
    yield put(getUpcomingAppointmentsSuccess(upcomingAppointmentsPage));
  } catch (err) {
    const errMsg = getErrorMessage(err);
    yield put(getUpcomingAppointmentsError(err));
    yield put(showNotification(errMsg));
  }
}

export function* cancelAppointmentSaga({ id }) {
  try {
    yield call(cancelAppointment, id);
    yield put(cancelAppointmentSuccess(id));
    yield put(showNotification('Appointment is cancelled.'));
  } catch (err) {
    yield put(cancelAppointmentError(err));
    yield put(showNotification('Failed to cancel appointment.'));
  }
}


export function* watchGetUpcomingAppointmentsSaga() {
  yield takeLatest(GET_UPCOMING_APPOINTMENTS, getUpcomingAppointmentsSaga);
}

export function* watchCancelAppointmentSaga() {
  yield takeLatest(CANCEL_APPOINTMENT, cancelAppointmentSaga);
}

export default function* rootSaga() {
  yield all([
    watchGetUpcomingAppointmentsSaga(),
    watchCancelAppointmentSaga(),
  ]);
}
