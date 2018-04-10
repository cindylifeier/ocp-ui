import { all, call, put, takeLatest } from 'redux-saga/effects';
import { showNotification } from 'containers/Notification/actions';
import { goBack } from 'react-router-redux';
import { createConsent } from './api';
import { createConsentError, createConsentSuccess } from './actions';
import { CREATE_CONSENT } from './constants';

function* createConsentSaga(action) {
  try {
    const createConsentResponse = yield call(createConsent, action.consentFormData);
    yield put(createConsentSuccess(createConsentResponse));
    yield put(showNotification('Successfully create the Consent Resource.'));
    yield call(action.handleSubmitting);
    yield put(goBack());
  } catch (error) {
    yield put(showNotification(`Failed to create the Consent Resource.${getErrorDetail(error)}`));
    yield call(action.handleSubmitting);
    yield put(createConsentError(error));
  }
}

function* watchCreateConsentSaga() {
  yield takeLatest(CREATE_CONSENT, createConsentSaga);
}

function getErrorDetail(err) {
  let errorDetail = '';
  if (err && err.message === 'Failed to fetch') {
    errorDetail = ' Server is offline.';
  } else if (err && err.response && err.response.status === 409) {
    errorDetail = ' Duplicate Entry:: Consent already exists.';
  } else if (err && err.response && err.response.status === 412) {
    errorDetail = 'Precondition Failed:: No care team members.';
  } else if (err && err.response && err.response.status === 500) {
    errorDetail = ' Unknown server error.';
  }
  return errorDetail;
}

/**
 * Root saga manages watcher lifecycle
 */
export default function* rootSaga() {
  yield all([
    watchCreateConsentSaga(),
  ]);
}
