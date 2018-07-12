import { all, call, put, takeLatest } from 'redux-saga/effects';

import { getErrorDetail } from 'containers/App/helpers';
import { searchRelatedPersonsError, searchRelatedPersonsSuccess } from './actions';
import { SEARCH_RELATED_PERSONS } from './constants';
import { searchRelatedPersons } from './api';


export function* searchRelatedPersonsSaga({ searchValue, showInActive, searchType, patientId, currentPage }) {
  try {
    const relatedPersons = yield call(searchRelatedPersons, searchValue, showInActive, searchType, patientId, currentPage);
    yield put(searchRelatedPersonsSuccess(relatedPersons));
  } catch (error) {
    yield put(searchRelatedPersonsError(getErrorDetail(error)));
  }
}

export function* watchSearchRelatedPersonsSaga() {
  yield takeLatest(SEARCH_RELATED_PERSONS, searchRelatedPersonsSaga);
}

/**
 * Root saga manages watcher lifecycle
 */
export default function* rootSaga() {
  yield all([
    watchSearchRelatedPersonsSaga(),
  ]);
}
