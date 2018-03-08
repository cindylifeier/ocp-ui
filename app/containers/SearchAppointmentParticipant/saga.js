import { showNotification } from 'containers/Notification/actions';
import {
  getSearchAppointmentParticipantError,
  getSearchAppointmentParticipantSuccess,
} from 'containers/SearchAppointmentParticipant/actions';
import { searchAppointmentParticipant } from 'containers/SearchAppointmentParticipant/api';
import { SEARCH_APPOINTMENT_PARTICIPANT } from 'containers/SearchAppointmentParticipant/constants';
import isEmpty from 'lodash/isEmpty';
import { all, call, put, takeLatest } from 'redux-saga/effects';

export function* searchAppointmentParticipantWorker(action) {
  try {
    if (!isEmpty(action.name) && !isEmpty(action.member)) {
      const participants = yield call(searchAppointmentParticipant, action.name, action.member, action.patientId);
      yield put(getSearchAppointmentParticipantSuccess(participants));
    }
  } catch (error) {
    yield put(showNotification('No participant found'));
    yield put(getSearchAppointmentParticipantError(error));
  }
}

export function* watchSearchAppointmentParticipant() {
  yield takeLatest(SEARCH_APPOINTMENT_PARTICIPANT, searchAppointmentParticipantWorker);
}

export default function* rootSaga() {
  yield all([
    watchSearchAppointmentParticipant(),
  ]);
}
