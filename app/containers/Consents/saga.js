// import { take, call, put, select } from 'redux-saga/effects';

import { all, call, put, select, takeLatest } from 'redux-saga/effects';
import { makeSelectPatient, makeSelectUser } from 'containers/App/contextSelectors';
import { showNotification } from 'containers/Notification/actions';
import isEmpty from 'lodash/isEmpty';
import { getConsent } from 'containers/ManageConsentPage/api';
import { goBack } from 'react-router-redux';
import makeSelectConsents from './selectors';
import { GET_CONSENTS, GET_CONSENT, DELETE_CONSENT } from './constants';
import { getConsentsError, getConsentsSuccess, getConsentSuccess, getConsentError } from './actions';
import { getConsents, getErrorDetail, getConsentByIdFromStore, deleteConsent } from './api';

/**
 * Root saga manages watcher lifecycle
 */
export function* getConsentsSaga({ pageNumber }) {
  try {
    let queryParams = {
      pageNumber,
    };
    const patient = yield select(makeSelectPatient());
    const practitioner = yield select(makeSelectUser());
    const patientId = patient ? patient.id : null;
    const practitionerId = (practitioner && practitioner.fhirResource) ? practitioner.fhirResource.logicalId : null;
    if (patientId && practitionerId) {
      queryParams = {
        pageNumber,
        patient: patientId,
        practitioner: practitionerId,
      };
    } else if (patientId) {
      queryParams = {
        pageNumber,
        patient: patientId,
      };
    } else if (practitionerId) {
      queryParams = {
        pageNumber,
        practitioner: practitionerId,
      };
    }

    const consents = yield call(getConsents, queryParams);
    yield put(getConsentsSuccess(consents));
  } catch (err) {
    yield put(getConsentsError(getErrorDetail(err)));
  }
}

export function* watchGetConsentsSaga() {
  yield takeLatest(GET_CONSENTS, getConsentsSaga);
}

function* getConsentByIdSaga({ logicalId }) {
  try {
    let selectedConsent;
    // Load Consents from store
    const consents = yield select(makeSelectConsents());
    selectedConsent = getConsentByIdFromStore(consents.data, logicalId);
    // fetch from backend if cannot find Consent from store
    if (isEmpty(selectedConsent)) {
      selectedConsent = yield call(getConsent, logicalId);
    }
    yield put(getConsentSuccess(selectedConsent));
  } catch (error) {
    yield put(showNotification('No matching Consent found.'));
    yield put(goBack());
    yield put(getConsentError(error));
  }
}

function* watchGetConsentByIdSaga() {
  yield takeLatest(GET_CONSENT, getConsentByIdSaga);
}


function* deleteConsentSaga(action) {
  try {
    if (action.consent) {
      yield call(deleteConsent, action.consent);
      yield put(showNotification('Successfully delete the Consent Resource.'));
    }
  } catch (error) {
    yield put(showNotification(`Failed to delete the Consent Resource.${getErrorDetail(error)}`));
  }
}

function* watchDeleteConsentSaga() {
  yield takeLatest(DELETE_CONSENT, deleteConsentSaga);
}

export default function* rootSaga() {
  yield all([
    watchGetConsentsSaga(),
    watchGetConsentByIdSaga(),
    watchDeleteConsentSaga(),
  ]);
}

