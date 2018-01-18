import { call, put, takeLatest } from 'redux-saga/effects';
import { DEFAULT_PAGE_SIZE, LOAD_PATIENT_SEARCH_RESULT } from './constants';
import { searchPatientsError, searchPatientsSuccess } from './actions';
import getApiBaseUrl from '../../apiBaseUrlConfig';
import request from '../../utils/request';

export function* fetchSearchResult({ searchTerms, searchType, includeInactive, currentPage }) {
  const apiBaseURL = getApiBaseUrl();
  const requestURL = `${apiBaseURL}/patients/search?value=${searchTerms}&showInactive=${includeInactive}&type=${searchType}&page=${currentPage}&size=${DEFAULT_PAGE_SIZE}`;

  try {
    const searchPatientResult = yield call(request, requestURL);
    yield put(searchPatientsSuccess(searchPatientResult, searchTerms, searchType, includeInactive));
  } catch (error) {
    yield put(searchPatientsError(error));
  }
}

/**
 * Root saga manages watcher lifecycle
 */
export default function* watchFetchPatients() {
  yield takeLatest(LOAD_PATIENT_SEARCH_RESULT, fetchSearchResult);
}
