import { all, call, put, select, takeLatest } from 'redux-saga/effects';
import { goBack, push } from 'react-router-redux';
import isEmpty from 'lodash/isEmpty';
import { getPractitionerError, getPractitionerSuccess, savePractitionerError } from './actions';
import { GET_PRACTITIONER, SAVE_PRACTITIONER } from './constants';
import { getNotificationAction, getPractitioner, getPractitionerById, savePractitioner } from './api';
import { showNotification } from '../Notification/actions';
import { makeSelectPractitionerSearchResult } from '../Practitioners/selectors';
import { HOME_URL } from '../App/constants';

function* savePractitionerWorker(action) {
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

function* getPractitionerWorker({ logicalId }) {
  try {
    let practitioner;
    // Load practitioners from store
    const practitioners = yield select(makeSelectPractitionerSearchResult());
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

function* watchGetPractitioner() {
  yield takeLatest(GET_PRACTITIONER, getPractitionerWorker);
}

function* watchSavePractitioner() {
  yield takeLatest(SAVE_PRACTITIONER, savePractitionerWorker);
}

/**
 * Root saga manages watcher lifecycle
 */
export default function* rootSaga() {
  yield all([
    watchGetPractitioner(),
    watchSavePractitioner(),
  ]);
}
