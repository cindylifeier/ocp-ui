import { put, takeLatest } from 'redux-saga/effects';
import { LOAD_PATIENT_SEARCH_RESULT } from './constants';
import { searchPatientsError, searchPatientsSuccess } from './actions';

export function* loadSearchResult({ searchTerms, searchType, includeInactive }) {
  const requestURL = `http://localhost:8444/patients/search?value=${searchTerms}&showInactive=${includeInactive}&type=${searchType}`;

  try {
    const searchPatientResult = yield fetch(requestURL).then((resp) => resp.json());
    yield put(searchPatientsSuccess(searchPatientResult));
  } catch (error) {
    yield put(searchPatientsError(error));
  }
}

export default function* getPatients() {
  yield takeLatest(LOAD_PATIENT_SEARCH_RESULT, loadSearchResult);
}
