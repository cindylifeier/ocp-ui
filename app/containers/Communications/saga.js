import { all, call, put, takeLatest } from 'redux-saga/effects';
import { GET_COMMUNICATIONS } from 'containers/Communications/constants';
import { getCommunicationsError, getCommunicationsSuccess } from 'containers/Communications/actions';
import { showNotification } from '../Notification/actions';
import { getCommunications } from './api';

export function* getCommunicationsSaga(action) {
  try {
    const communications = yield call(getCommunications, action.patientId, action.pageNumber);
    yield put(getCommunicationsSuccess(communications));
  } catch (error) {
    yield put(showNotification('Error in getting communications.'));
    yield put(getCommunicationsError(error));
  }
}

export function* watchGetCommunicationsSaga() {
  yield takeLatest(GET_COMMUNICATIONS, getCommunicationsSaga);
}

export default function* rootSaga() {
  yield all([
    watchGetCommunicationsSaga(),
  ]);
}

