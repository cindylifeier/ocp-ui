import { call, put, takeLatest } from 'redux-saga/effects';

import { searchPractitionersError, searchPractitionersSuccess } from './actions';
import { LOAD_PRACTITIONER_SEARCH_RESULT } from './constants';
import searchPractitioners from './api';

export function* getPractitionerSearchResultSaga({ searchTerms, searchType, includeInactive, currentPage }) {
  try {
    const searchPractitionerResult = yield call(searchPractitioners, searchTerms, searchType, includeInactive, currentPage);
    yield put(searchPractitionersSuccess(searchPractitionerResult, searchTerms, searchType, includeInactive));
  } catch (error) {
    yield put(searchPractitionersError(error));
  }
}

/**
 * Root saga manages watcher lifecycle
 */
export default function* watchGetPractitionersSaga() {
  yield takeLatest(LOAD_PRACTITIONER_SEARCH_RESULT, getPractitionerSearchResultSaga);
}
