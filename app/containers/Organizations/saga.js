import { call, put, takeLatest } from 'redux-saga/effects';
import { DEFAULT_PAGE_SIZE, LOAD_ORGANIZATIONS } from './constants';
import { loadOrganizationsError, loadOrganizationsSuccess } from './actions';
import queryString from '../../utils/queryString';
import getApiBaseUrl from '../../apiBaseUrlConfig';
import request from '../../utils/request';
import { mapToFrontendOrganizationList } from './api';

const baseApiUrl = getApiBaseUrl();

export function* fetchSearchOrganizationsResult({ searchValue, showInactive, searchType, currentPage }) {
  const params = queryString({ searchValue, showInactive, searchType, size: DEFAULT_PAGE_SIZE, page: currentPage });
  const requestURL = `${baseApiUrl}/organizations/search${params}`;
  try {
    if (searchValue) {
      const organizations = yield call(request, requestURL);
      yield put(loadOrganizationsSuccess(mapToFrontendOrganizationList(organizations)));
    }
  } catch (err) {
    yield put(loadOrganizationsError(err));
  }
}

/**
 * Root saga manages watcher lifecycle
 */
export default function* watchFetchOrganizations() {
  yield takeLatest(LOAD_ORGANIZATIONS, fetchSearchOrganizationsResult);
}
