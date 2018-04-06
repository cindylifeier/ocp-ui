// import { take, call, put, select } from 'redux-saga/effects';


import { goBack } from 'react-router-redux';
import { call, put, takeLatest, all } from 'redux-saga/effects';

import { showNotification } from 'containers/Notification/actions';
import { getConsent } from './api';
import { getConsentError, getConsentSuccess } from './actions';
import { GET_CONSENT } from './constants';

function* getConsentSaga({ logicalId }) {
  try {
    const consent = yield call(getConsent, logicalId);
    yield put(getConsentSuccess(consent));
  } catch (error) {
    yield put(showNotification('No matching practitioner found.'));
    yield put(goBack());
    yield put(getConsentError(error));
  }
}

function* watchGetConsentSaga() {
  yield takeLatest(GET_CONSENT, getConsentSaga);
}


/**
 * Root saga manages watcher lifecycle
 */
export default function* rootSaga() {
  yield all([
    watchGetConsentSaga(),
  ]);
}
