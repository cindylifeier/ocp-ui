import { all, call, put, takeLatest, select } from 'redux-saga/effects';

import { showNotification } from 'containers/Notification/actions';
import { makeSelectPatient } from 'containers/App/contextSelectors';
import { getCoverageError,
  getCoverageSuccess,
  getSubscriberOptionsSuccess,
} from './actions';
import {
  SAVE_COVERAGE,
  GET_SUBSCRIBER_OPTIONS,
  GET_COVERAGE,
} from './constants';
import {
  getSubscriberOptions,
  saveCoverage,
  getCoverages,
} from './api';

function* saveCoverageSaga(action) {
  try {
    yield call(saveCoverage, action.coverageData);
    yield put(showNotification('Success in created Coverage.'));
    yield call(action.handleSubmitting);
  } catch (error) {
    yield put(showNotification('Error in creating coverage.'));
    yield call(action.handleSubmitting);
  }
}

function* getSubscriberOptionsSaga(action) {
  try {
    const subscriberOptions = yield call(getSubscriberOptions, action.patientId);
    yield put(getSubscriberOptionsSuccess(subscriberOptions));
  } catch (error) {
    yield put(showNotification('Error in  getting subscriber options'));
  }
}


export function* getCoveragesSaga({ pageNumber }) {
  try {
    const patient = yield select(makeSelectPatient());
    const coverages = yield call(getCoverages, patient.id, pageNumber);
    yield put(getCoverageSuccess(coverages));
  } catch (error) {
    yield put(getCoverageError(error));
  }
}

function* watchSaveCoverageSaga() {
  yield takeLatest(SAVE_COVERAGE, saveCoverageSaga);
}

function* watchGetSubscriberOptionsSaga() {
  yield takeLatest(GET_SUBSCRIBER_OPTIONS, getSubscriberOptionsSaga);
}


export function* watchGetCoveragesSaga() {
  yield takeLatest(GET_COVERAGE, getCoveragesSaga);
}

/**
 * Root saga manages watcher lifecycle
 */
export default function* rootSaga() {
  yield all([
    watchSaveCoverageSaga(),
    watchGetSubscriberOptionsSaga(),
    watchGetCoveragesSaga(),
  ]);
}
