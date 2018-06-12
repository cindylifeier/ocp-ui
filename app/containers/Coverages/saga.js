import { all, call, put, takeLatest } from 'redux-saga/effects';

import { showNotification } from 'containers/Notification/actions';
import { SAVE_COVERAGE, GET_SUBSCRIBER_OPTIONS } from './constants';
import { getSubscriberOptionsSuccess } from './actions';
import { getSubscriberOptions, saveCoverage } from './api';

function* saveCoverageSaga(action) {
  try {
    yield call(saveCoverage, action.careTeamFormData);
    yield put(showNotification('Success created the care team.'));
    yield call(action.handleSubmitting);
  } catch (error) {
    yield put(showNotification('Failed to create coverage.'));
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

function* watchSaveCoverageSaga() {
  yield takeLatest(SAVE_COVERAGE, saveCoverageSaga);
}

function* watchGetSubscriberOptionsSaga() {
  yield takeLatest(GET_SUBSCRIBER_OPTIONS, getSubscriberOptionsSaga);
}

/**
 * Root saga manages watcher lifecycle
 */
export default function* rootSaga() {
  yield all([
    watchSaveCoverageSaga(),
    watchGetSubscriberOptionsSaga(),
  ]);
}
