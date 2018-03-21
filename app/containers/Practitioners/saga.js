import { all, call, put, takeLatest } from 'redux-saga/effects';

import { searchPractitionersError, searchPractitionersSuccess } from './actions';
import { SEARCH_PRACTITIONERS } from './constants';
import searchPractitioners from './api';

export function* searchPractitionersSaga({ searchType, searchValue, includeInactive, currentPage }) {
  try {
    const practitioners = yield call(searchPractitioners, searchType, searchValue, includeInactive, currentPage);
    yield put(searchPractitionersSuccess(practitioners));
  } catch (error) {
    yield put(searchPractitionersError(error));
  }
}

export function* watchSearchPractitionersSaga() {
  yield takeLatest(SEARCH_PRACTITIONERS, searchPractitionersSaga);
}

/**
 * Root saga manages watcher lifecycle
 */
export default function* rootSaga() {
  yield all([
    watchSearchPractitionersSaga(),
  ]);
}
