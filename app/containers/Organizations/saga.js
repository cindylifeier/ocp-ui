// import { take, call, put, select } from 'redux-saga/effects';

// Individual exports for testing
import { call, put, takeLatest } from 'redux-saga/effects';
import { LOAD_ORGANIZATIONS } from './constants';
import getOrganizations from './api';
import { loadOrganizationsError, loadOrganizationsSuccess } from './actions';

export function* getOrganizationsFromApi({ searchValue, showInactive, searchType, currentPage }) {
  try {
    if (searchValue) {
      const organizations = yield call(getOrganizations, searchValue, showInactive, searchType, currentPage);
      yield put(loadOrganizationsSuccess(organizations));
    }
  } catch (err) {
    yield put(loadOrganizationsError(err));
  }
}

export default function* loadOrganizations() {
  yield takeLatest(LOAD_ORGANIZATIONS, getOrganizationsFromApi);
}
