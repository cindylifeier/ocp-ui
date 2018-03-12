import {
  determineNotificationForAppointment,
  determineNotificationForAppointmentInPastTense,
  saveAppointment,
} from 'containers/ManageAppointmentPage/api';
import { SAVE_APPOINTMENT } from 'containers/ManageAppointmentPage/constants';
import { showNotification } from 'containers/Notification/actions';
import { goBack } from 'react-router-redux';
import { all, call, put, takeLatest } from 'redux-saga/effects';

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

export default function* rootSaga() {
  yield all([
    watchSaveAppointmentSaga(),
  ]);
}
