import { all, call, put, select, takeLatest } from 'redux-saga/effects';

import { getErrorDetail } from 'containers/App/helpers';
import { makeSelectPatient } from 'containers/App/contextSelectors';
import { showNotification } from 'containers/Notification/actions';
import { searchRelatedPersonsError, searchRelatedPersonsSuccess } from './actions';
import { SEARCH_RELATED_PERSONS } from './constants';
import { searchRelatedPersons } from './api';


export function* searchRelatedPersonsSaga({ currentPage, searchValue, showInActive, searchType }) {
  try {
    const patient = yield select(makeSelectPatient());
    if (patient) {
      const patientId = patient.id;
      const relatedPersons = yield call(searchRelatedPersons, searchValue, showInActive, searchType, patientId, currentPage);
      yield put(searchRelatedPersonsSuccess(relatedPersons));
    } else {
      yield put(showNotification('No patient found.'));
    }
  } catch (error) {
    yield put(searchRelatedPersonsError(getErrorDetail(error)));
  }
}

export function* watchSearchRelatedPersonsSaga() {
  yield takeLatest(SEARCH_RELATED_PERSONS, searchRelatedPersonsSaga);
}

/**
 * Root saga manages watcher lifecycle
 */
export default function* rootSaga() {
  yield all([
    watchSearchRelatedPersonsSaga(),
  ]);
}
