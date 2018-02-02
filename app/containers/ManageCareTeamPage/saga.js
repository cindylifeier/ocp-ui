import { all, call, put, select, takeLatest } from 'redux-saga/effects';
import { push } from 'react-router-redux';
import isEmpty from 'lodash/isEmpty';

import { showNotification } from '../Notification/actions';
import { HOME_URL } from '../App/constants';
import { GET_PATIENT } from './constants';
import { getPatientSuccess } from './actions';
import { makeSelectPatientSearchResult } from '../Patients/selectors';
import { getPatient } from '../ManagePatientPage/api';
import { getPatientById } from './api';

function* getPatientWorker({ patientId }) {
  try {
    let patient;
    // Load patients from store
    const patients = yield select(makeSelectPatientSearchResult());
    patient = getPatientById(patients, patientId);
    // fetch from backend if cannot find patient from store
    if (isEmpty(patient)) {
      patient = yield call(getPatient, patientId);
    }
    yield put(getPatientSuccess(patient));
  } catch (error) {
    yield put(showNotification('No match patient found.'));
    yield put(push(HOME_URL));
  }
}

function* watchManageCareTeam() {
  yield takeLatest(GET_PATIENT, getPatientWorker);
}

/**
 * Root saga manages watcher lifecycle
 */
export default function* rootSaga() {
  yield all([
    watchManageCareTeam(),
  ]);
}

