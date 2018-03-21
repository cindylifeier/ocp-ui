import { all, call, put, takeLatest } from 'redux-saga/effects';

import { showNotification } from 'containers/Notification/actions';
import { getPractitionersSuccess, searchPractitionersError, searchPractitionersSuccess } from './actions';
import { getPractitioners, searchPractitioners } from './api';
import { GET_PRACTITIONERS, SEARCH_PRACTITIONERS } from './constants';


export function* getPractitionersSaga({ currentPage }) {
  try {
    const practitioners = yield call(getPractitioners, currentPage);
    yield put(getPractitionersSuccess(practitioners));
  } catch (err) {
    yield put(showNotification('Failed to get the practitioners.'));
  }
}


export function* searchPractitionersSaga({ searchType, searchValue, includeInactive, currentPage }) {
  try {
    const practitioners = yield call(searchPractitioners, searchType, searchValue, includeInactive, currentPage);
    yield put(searchPractitionersSuccess(practitioners));
  } catch (error) {
    yield put(searchPractitionersError(error));
  }
}

export function* watchGetPractitionersSaga() {
  yield takeLatest(GET_PRACTITIONERS, getPractitionersSaga);
}


export function* watchSearchPractitionersSaga() {
  yield takeLatest(SEARCH_PRACTITIONERS, searchPractitionersSaga);
}

/**
 * Root saga manages watcher lifecycle
 */
export default function* rootSaga() {
  yield all([
    watchGetPractitionersSaga(),
    watchSearchPractitionersSaga(),
  ]);
}
