import { all, call, put, select, takeLatest } from 'redux-saga/effects';
import { goBack } from 'react-router-redux';

import { makeSelectPatient } from 'containers/App/contextSelectors';
import { showNotification } from 'containers/Notification/actions';
import { saveConsentError } from './actions';
import { getErrorDetail, saveConsent } from './api';
import { SAVE_CONSENT } from './constants';


function* saveConsentSaga(action) {
  try {
    const patient = yield select(makeSelectPatient);
    yield call(saveConsent, action.consentFormData, patient);
    yield put(showNotification(`Successfully ${action.consentFormData.logicalId ? 'edit' : 'create'} the Consent Resource.`));
    yield call(action.handleSubmitting);
    yield put(goBack());
  } catch (error) {
    yield put(showNotification(`Failed to ${action.consentFormData.logicalId ? 'edit' : 'create'} the Consent Resource.${getErrorDetail(error)}`));
    yield call(action.handleSubmitting);
    yield put(saveConsentError(error));
  }
}

function* watchSaveConsentSaga() {
  yield takeLatest(SAVE_CONSENT, saveConsentSaga);
}

/**
 * Root saga manages watcher lifecycle
 */
export default function* rootSaga() {
  yield all([
    watchSaveConsentSaga(),
  ]);
}
