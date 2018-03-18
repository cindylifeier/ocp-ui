import { all, call, put, takeLatest } from 'redux-saga/effects';
import { SEARCH_ORGANIZATIONS } from './constants';
import searchOrganizations from './api';
import { searchOrganizationsError, searchOrganizationsSuccess } from './actions';

export function* getOrganizationsSaga({ searchValue, showInactive, searchType, currentPage }) {
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
  yield takeLatest(SEARCH_ORGANIZATIONS, getOrganizationsSaga);
}

/**
 * Root saga manages watcher lifecycle
 */
export default function* rootSaga() {
  yield all([watchGetOrganizationsSaga()]);
}
