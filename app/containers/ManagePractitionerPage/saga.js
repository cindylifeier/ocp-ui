import { all, call, put, select, takeLatest } from 'redux-saga/effects';
import { goBack, push } from 'react-router-redux';
import isEmpty from 'lodash/isEmpty';

import { searchOrganizations } from 'containers/Organizations/api';
import { makeSelectProviderRoles, makeSelectProviderSpecialties } from 'containers/App/lookupSelectors';
import { showNotification } from 'containers/Notification/actions';
import makeSelectPractitioners from 'containers/Practitioners/selectors';
import { HOME_URL } from 'containers/App/constants';
import {
  getOrganizationsError,
  getOrganizationsSuccess,
  getPractitionerError,
  getPractitionerSuccess,
  savePractitionerError,
} from './actions';
import { GET_ORGANIZATIONS, GET_PRACTITIONER, SAVE_PRACTITIONER } from './constants';
import { getNotificationAction, getPractitioner, getPractitionerById, savePractitioner } from './api';

function* savePractitionerSaga(action) {
  try {
    const roleLookup = yield select(makeSelectProviderRoles());
    const specialtyLookup = yield select(makeSelectProviderSpecialties());
    yield call(savePractitioner, action.practitionerFormData, roleLookup, specialtyLookup);
    yield put(showNotification(`Successfully ${getNotificationAction(action.practitionerFormData)} the practitioner.`));
    yield call(action.handleSubmitting);
    yield put(goBack());
  } catch (error) {
    yield put(showNotification(`Failed to ${getNotificationAction(action.practitionerFormData)} the practitioner.`));
    yield call(action.handleSubmitting);
    yield put(savePractitionerError(error));
  }
}

function* getPractitionerSaga({ logicalId }) {
  try {
    let practitioner;
    // Load practitioners from store
    const practitioners = yield select(makeSelectPractitioners);
    practitioner = getPractitionerById(practitioners.searchOrganizations.result, logicalId);
    // fetch from backend if cannot find practitioner from store
    if (isEmpty(practitioner)) {
      practitioner = yield call(getPractitioner, logicalId);
    }
    yield put(getPractitionerSuccess(practitioner));
  } catch (error) {
    yield put(showNotification('No matching practitioner found.'));
    yield put(push(HOME_URL));
    yield put(getPractitionerError(error));
  }
}

export function* getOrganizationsSaga({ searchValue, showInactive, searchType, currentPage }) {
  try {
    if (searchValue) {
      const organizations = yield call(searchOrganizations, searchValue, showInactive, searchType, currentPage);
      yield put(getOrganizationsSuccess(organizations));
    }
  } catch (err) {
    yield put(getOrganizationsError(err));
  }
}

export function* watchGetOrganizationsSaga() {
  yield takeLatest(GET_ORGANIZATIONS, getOrganizationsSaga);
}

function* watchGetPractitionerSaga() {
  yield takeLatest(GET_PRACTITIONER, getPractitionerSaga);
}

function* watchSavePractitionerSaga() {
  yield takeLatest(SAVE_PRACTITIONER, savePractitionerSaga);
}

/**
 * Root saga manages watcher lifecycle
 */
export default function* rootSaga() {
  yield all([
    watchGetPractitionerSaga(),
    watchSavePractitionerSaga(),
    watchGetOrganizationsSaga(),
  ]);
}
