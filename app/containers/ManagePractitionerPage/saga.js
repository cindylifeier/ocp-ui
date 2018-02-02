import { call, put, select, takeLatest } from 'redux-saga/effects';
import { goBack, push } from 'react-router-redux';
import isEmpty from 'lodash/isEmpty';
import find from 'lodash/find';
import { getPractitionerError, getPractitionerSuccess, savePractitionerError } from './actions';
import { GET_PRACTITIONER, SAVE_PRACTITIONER } from './constants';
import { getPractitioner, savePractitioner } from './api';
import { showNotification } from '../Notification/actions';
import { makeSelectSearchResult } from '../Practitioners/selectors';
import { HOME_URL } from '../App/constants';

export function* savePractitionerWorker(action) {
  try {
    yield call(savePractitioner, action.practitionerFormData);
    yield put(showNotification(`Successfully ${getNotificationAction(action.practitionerFormData)} the practitioner.`));
    yield call(action.handleSubmitting);
    yield put(goBack());
  } catch (error) {
    yield put(showNotification(`Failed to ${getNotificationAction(action.practitionerFormData)} the practitioner.`));
    yield call(action.handleSubmitting);
    yield put(savePractitionerError(error));
  }
}

export function* getPractitionerWorker({ logicalId }) {
  try {
    let practitioner;
    // Load practitioners from store
    const practitioners = yield select(makeSelectSearchResult());
    practitioner = getPractitionerById(practitioners, logicalId);
    // fetch from backend if cannot find practitioner from store
    if (isEmpty(practitioner)) {
      practitioner = yield call(getPractitioner, logicalId);
    }
    yield put(getPractitionerSuccess(practitioner));
  } catch (error) {
    yield put(showNotification('No match practitioner found.'));
    yield put(push(HOME_URL));
    yield put(getPractitionerError(error));
  }
}

/**
 * Root saga manages watcher lifecycle
 */
export default function* watchSavePractitioner() {
  yield takeLatest(SAVE_PRACTITIONER, savePractitionerWorker);
  yield takeLatest(GET_PRACTITIONER, getPractitionerWorker);
}

function getNotificationAction(practitionerFormData) {
  let action = 'create';
  if (practitionerFormData.logicalId) {
    action = 'edit';
  }
  return action;
}

function getPractitionerById(practitioners, logicalId) {
  if (!isEmpty(practitioners)) {
    return find(practitioners, { logicalId });
  }
  return null;
}
