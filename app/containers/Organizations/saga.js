import { all, call, put, takeLatest } from 'redux-saga/effects';
import { showNotification } from 'containers/Notification/actions';
import { GET_ORGANIZATIONS, SEARCH_ORGANIZATIONS } from './constants';
import { getOrganizations, searchOrganizations } from './api';
import { getOrganizationsSuccess, searchOrganizationsError, searchOrganizationsSuccess } from './actions';

export function* getOrganizationsSaga({ showInactive, currentPage }) {
  try {
    const organizations = yield call(getOrganizations, showInactive, currentPage);
    yield put(getOrganizationsSuccess(organizations));
  } catch (err) {
    yield put(showNotification('Failed to get the organizations.'));
  }
}

export function* searchOrganizationsSaga({ searchValue, showInactive, searchType, currentPage }) {
  try {
    if (searchValue) {
      const organizations = yield call(searchOrganizations, searchValue, showInactive, searchType, currentPage);
      yield put(searchOrganizationsSuccess(organizations));
    }
  } catch (err) {
    yield put(searchOrganizationsError(err));
  }
}

export function* watchGetOrganizationsSaga() {
  yield takeLatest(GET_ORGANIZATIONS, getOrganizationsSaga);
}

export function* watchSearchOrganizationsSaga() {
  yield takeLatest(SEARCH_ORGANIZATIONS, searchOrganizationsSaga);
}

/**
 * Root saga manages watcher lifecycle
 */
export default function* rootSaga() {
  yield all([
    watchGetOrganizationsSaga(),
    watchSearchOrganizationsSaga(),
  ]);
}
