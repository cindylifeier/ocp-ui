import { call, put, takeLatest } from 'redux-saga/effects';
import { goBack } from 'react-router-redux';
import { savePractitionerError } from './actions';
import { SAVE_PRACTITIONER } from './constants';
import savePractitioner from './api';
import { showNotification } from '../Notification/actions';

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

/**
 * Root saga manages watcher lifecycle
 */
export default function* watchSavePractitioner() {
  yield takeLatest(SAVE_PRACTITIONER, savePractitionerWorker);
}

function getNotificationAction(practitionerFormData) {
  let action = 'create';
  if (practitionerFormData.logicalId) {
    action = 'edit';
  }
  return action;
}
