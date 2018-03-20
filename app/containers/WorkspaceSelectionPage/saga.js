import { all, call, put, takeLatest } from 'redux-saga/effects';
import { showNotification } from 'containers/Notification/actions';
import { GET_CARE_COORDINATORS, GET_CARE_MANAGERS, GET_ORGANIZATIONS, GET_PATIENTS } from './constants';
import {
  getCareCoordinatorsSuccess,
  getCareManagersSuccess,
  getOrganizationsSuccess,
  getPatientsSuccess,
} from './actions';
import { getCareCoordinators, getCareManagers, getOrganizations, getPatients } from './api';

export function* getOrganizationsSaga() {
  try {
    const organizations = yield call(getOrganizations);
    yield put(getOrganizationsSuccess(organizations));
  } catch (err) {
    yield put(showNotification('Failed to get the organizations.'));
  }
}

export function* getCareManagersSaga() {
  try {
    const careManagers = yield call(getCareManagers);
    yield put(getCareManagersSuccess(careManagers));
  } catch (err) {
    yield put(showNotification('Failed to get the care managers.'));
  }
}

export function* getCareCoordinatorsSaga() {
  try {
    const careCoordinators = yield call(getCareCoordinators);
    yield put(getCareCoordinatorsSuccess(careCoordinators));
  } catch (err) {
    yield put(showNotification('Failed to get the care coordinators.'));
  }
}

export function* getPatientsSaga() {
  try {
    const patients = yield call(getPatients);
    yield put(getPatientsSuccess(patients));
  } catch (err) {
    yield put(showNotification('Failed to get the patients.'));
  }
}

export function* watchGetOrganizationsSaga() {
  yield takeLatest(GET_ORGANIZATIONS, getOrganizationsSaga);
}

export function* watchGetCareManagersSaga() {
  yield takeLatest(GET_CARE_MANAGERS, getCareManagersSaga);
}

export function* watchGetCareCoordinatorsSaga() {
  yield takeLatest(GET_CARE_COORDINATORS, getCareCoordinatorsSaga);
}

export function* watchGetPatientsSaga() {
  yield takeLatest(GET_PATIENTS, getPatientsSaga);
}

/**
 * Root saga manages watcher lifecycle
 */
export default function* rootSaga() {
  yield all([
    watchGetOrganizationsSaga(),
    watchGetCareManagersSaga(),
    watchGetCareCoordinatorsSaga(),
    watchGetPatientsSaga(),
  ]);
}
