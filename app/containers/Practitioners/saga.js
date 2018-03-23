import { all, call, put, takeLatest } from 'redux-saga/effects';

import { showNotification } from 'containers/Notification/actions';
import { getPractitionersInOrganizationSuccess, searchPractitionersError, searchPractitionersSuccess } from './actions';
import { getPractitionersInOrganization, searchPractitioners } from './api';
import { GET_PRACTITIONERS_IN_ORGANIZATION, SEARCH_PRACTITIONERS } from './constants';


export function* getPractitionersSaga({ currentPage }) {
  try {
    const practitioners = yield call(getPractitionersInOrganization, currentPage);
    yield put(getPractitionersInOrganizationSuccess(practitioners));
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
  yield takeLatest(GET_PRACTITIONERS_IN_ORGANIZATION, getPractitionersSaga);
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
