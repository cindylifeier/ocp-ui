import { all, call, put, takeLatest } from 'redux-saga/effects';
import { GET_UPCOMING_APPOINTMENTS } from 'containers/UpcomingAppointments/constants';
import { getUpcomingAppointmentsSuccess, getUpcomingAppointmentsError } from './actions';
import getUpcomingAppointmentsApi from './api';
import { showNotification } from '../Notification/actions';


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

export function* getUpcomingAppointmentsSaga() {
  try {
    const upcomingAppointmentsPage = yield call(getUpcomingAppointmentsApi);
    yield put(getUpcomingAppointmentsSuccess(upcomingAppointmentsPage));
  } catch (err) {
    const errMsg = getErrorMessage(err);
    yield put(getUpcomingAppointmentsError(err));
    yield put(showNotification(errMsg));
  }
}

export function* watchGetUpcomingAppointmentsSaga() {
  yield takeLatest(GET_UPCOMING_APPOINTMENTS, getUpcomingAppointmentsSaga);
}

export default function* rootSaga() {
  yield all([
    watchGetUpcomingAppointmentsSaga(),
  ]);
}
