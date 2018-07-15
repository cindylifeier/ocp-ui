import { all, call, put, takeLatest } from 'redux-saga/effects';
import { goBack } from 'react-router-redux';

import { getErrorDetail } from 'containers/App/helpers';
import { showNotification } from 'containers/Notification/actions';
import {
  removeRelatedPersonError,
  removeRelatedPersonSuccess,
  searchRelatedPersonsError,
  searchRelatedPersonsSuccess,
} from './actions';
import { REMOVE_RELATED_PERSON, SEARCH_RELATED_PERSONS } from './constants';
import { removeRelatedPerson, searchRelatedPersons } from './api';


export function* searchRelatedPersonsSaga({ careTeamId, currentPage, searchTerms }) {
  try {
    const relatedPersons = yield call(searchRelatedPersons, careTeamId, currentPage, searchTerms);
    yield put(searchRelatedPersonsSuccess(relatedPersons));
  } catch (error) {
    yield put(searchRelatedPersonsError(getErrorDetail(error)));
  }
}

export function* removeRelatedPersonSaga({ careTeamId, relatedPerson }) {
  try {
    yield call(removeRelatedPerson, careTeamId, relatedPerson);
    yield put(removeRelatedPersonSuccess());
    yield put(goBack());
  } catch (error) {
    yield put(showNotification('Failed to remove the related person.'));
    yield put(removeRelatedPersonError(getErrorDetail(error)));
  }
}

export function* watchSearchRelatedPersonsSaga() {
  yield takeLatest(SEARCH_RELATED_PERSONS, searchRelatedPersonsSaga);
}

export function* watchRemoveRelatedPersonSaga() {
  yield takeLatest(REMOVE_RELATED_PERSON, removeRelatedPersonSaga);
}

/**
 * Root saga manages watcher lifecycle
 */
export default function* rootSaga() {
  yield all([
    watchSearchRelatedPersonsSaga(),
    watchRemoveRelatedPersonSaga(),
  ]);
}
