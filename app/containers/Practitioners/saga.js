import { call, put, takeLatest } from 'redux-saga/effects';

import { searchPractitionersError, searchPractitionersSuccess } from './actions';
import { LOAD_PRACTITIONER_SEARCH_RESULT } from './constants';
import request from '../../utils/request';

export function* loadSearchResult({ searchTerms, searchType, includeInactive }) {
  const query = `searchType=${searchType}&searchValue=${searchTerms}&showInactive=${includeInactive}`;
  const requestURL = `http://localhost:8444/practitioners/search?${query}`;

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
