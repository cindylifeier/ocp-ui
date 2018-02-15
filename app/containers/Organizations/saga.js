import { call, put, takeLatest } from 'redux-saga/effects';
import { LOAD_ORGANIZATIONS } from './constants';
import searchOrganizations from './api';
import { loadOrganizationsError, loadOrganizationsSuccess } from './actions';

export function* getOrganizationsSaga({ searchValue, showInactive, searchType, currentPage }) {
  try {
    if (searchValue) {
      const organizations = yield call(searchOrganizations, searchValue, showInactive, searchType, currentPage);
      yield put(loadOrganizationsSuccess(organizations));
    }
  } catch (err) {
    yield put(loadOrganizationsError(err));
  }
}

/**
 * Root saga manages watcher lifecycle
 */
export default function* rootSaga() {
  yield takeLatest(LOAD_ORGANIZATIONS, getOrganizationsSaga);
}
