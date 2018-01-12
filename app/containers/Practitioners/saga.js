import { call, put, takeLatest } from 'redux-saga/effects';

import { searchPractitionersError, searchPractitionersSuccess } from './actions';
import { LOAD_PRACTITIONER_SEARCH_RESULT } from './constants';
import request from '../../utils/request';

export function* loadSearchResult({ searchTerms, searchType, includeInactive }) {
  const query = `searchType=${searchType}&searchValue=${searchTerms}&showInactive=${includeInactive}`;
  const apiBaseURL = 'http://localhost:8446/ocp-fis';
  const requestURL = `${apiBaseURL}/practitioners/search?${query}`;

  try {
    const searchPractitionerResult = yield call(request, requestURL);
    yield put(searchPractitionersSuccess(searchPractitionerResult, searchTerms));
  } catch (error) {
    yield put(searchPractitionersError(error));
  }
}

export default function* watchFetchPractitioners() {
  yield takeLatest(LOAD_PRACTITIONER_SEARCH_RESULT, loadSearchResult);
}
