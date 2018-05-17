import { makeSelectPatient, makeSelectUser } from 'containers/App/contextSelectors';
import { all, call, put, select, takeLatest } from 'redux-saga/effects';
import { showNotification } from 'containers/Notification/actions';

import {
GET_APPOINTMENTS,
} from './constants';
import {
getAppointmentsSuccess,
getAppointmentsError,
} from './actions';
import getAppointmentsApi from './api';

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

export function* getAppointmentsSaga({ query }) {
  try {
    let queryParams = query;
    const patient = yield select(makeSelectPatient());
    const practitioner = yield select(makeSelectUser());
    const patientId = patient ? patient.id : null;
    const practitionerId = (practitioner && practitioner.fhirResource) ? practitioner.fhirResource.logicalId : null;
    if (patientId && practitionerId) {
      queryParams = {
        patientId,
        requesterReference: `Patient/${patientId}`,
      };
    }
    if (practitionerId) {
      queryParams = {
        practitionerId,
        requesterReference: `Practitioner/${practitionerId}`,
      };
    }
    const appointments = yield call(getAppointmentsApi, queryParams);
    yield put(getAppointmentsSuccess(appointments));
  } catch (err) {
    const errMsg = getErrorMessage(err);
    yield put(getAppointmentsError(err));
    yield put(showNotification(errMsg));
  }
}

export function* watchGetAppointmentsSaga() {
  yield takeLatest(GET_APPOINTMENTS, getAppointmentsSaga);
}

export default function* defaultSaga() {
  yield all([
    watchGetAppointmentsSaga(),
  ]);
}
