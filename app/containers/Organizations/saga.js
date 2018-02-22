import { all, call, put, takeLatest } from 'redux-saga/effects';
import { GET_ORGANIZATIONS } from './constants';
import getOrganizations from './api';
import { getOrganizationsError, getOrganizationsSuccess } from './actions';

export function* getOrganizationsSaga({ searchValue, showInactive, searchType, currentPage }) {
  try {
    if (searchValue) {
      const organizations = yield call(getOrganizations, searchValue, showInactive, searchType, currentPage);
      yield put(getOrganizationsSuccess(organizations));
    }
  } catch (err) {
    yield put(getOrganizationsError(err));
  }
}

export function* watchGetOrganizationsSaga() {
  yield takeLatest(GET_ORGANIZATIONS, getOrganizationsSaga);
}

/**
 * Root saga manages watcher lifecycle
 */
export default function* rootSaga() {
  yield all([watchGetOrganizationsSaga()]);
}
