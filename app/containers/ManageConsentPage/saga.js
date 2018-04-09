import { createConsent } from 'containers/ManageConsentPage/api';
import { createConsentError, createConsentSuccess } from 'containers/ManageConsentPage/actions';
import { call, all, put, takeLatest } from 'redux-saga/es/effects';
import { showNotification } from 'containers/Notification/actions';
import { goBack } from 'react-router-redux';
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

function getErrorDetail(err) {
  let errorDetail = '';
  if (err && err.message === 'Failed to fetch') {
    errorDetail = ' Server is offline.';
  } else if (err && err.response && err.response.status === 409) {
    errorDetail = ' Duplicate Entry:: Consent already exists for the patient.';
  } else if (err && err.response && err.response.status === 500) {
    errorDetail = ' Unknown server error.';
  }
  return errorDetail;
}

function* watchCreateConsentSaga() {
  yield takeLatest(CREATE_CONSENT, createConsentSaga);
}
// Individual exports for testing
export default function* defaultSaga() {
  yield all([
    watchCreateConsentSaga(),
  ]);
}
