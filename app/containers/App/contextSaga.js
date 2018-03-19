import { all, call, put, select, takeLatest } from 'redux-saga/effects';

import { showNotification } from 'containers/Notification/actions';
import { REFRESH_PATIENT } from './contextConstants';
import { makeSelectPatient } from './contextSelectors';
import { getPatient } from './contextApi';
import { setPatient } from './contextActions';

export function* refreshPatientSaga() {
  const patient = yield select(makeSelectPatient());
  if (patient && patient.id) {
    const newPatient = yield call(getPatient, patient.id);
    yield put(setPatient(newPatient));
  } else {
    yield put(showNotification('Cannot refresh patient context, no patient is selected.'));
  }
}

export function* watchRefreshPatientSaga() {
  yield takeLatest(REFRESH_PATIENT, refreshPatientSaga);
}

export default function* rootSaga() {
  yield all([
    watchRefreshPatientSaga(),
  ]);
}
