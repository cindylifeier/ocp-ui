import { all, call, put, takeLatest } from 'redux-saga/effects';
import { goBack } from 'react-router-redux';
import { CREATE_COMMUNICATION, UPDATE_COMMUNICATION, GET_EPISODE_OF_CARES } from './constants';
import { showNotification } from '../Notification/actions';
import { saveCommunicationError, getEpisodeOfCaresSuccess } from './actions';
import { createCommunication, updateCommunication, getEpisodeOfCares } from './api';


export function* createCommunicationSaga(action) {
  try {
    if (action.communication) {
      yield call(createCommunication, action.communication);
      yield put(goBack());
    }
  } catch (error) {
    yield put(showNotification('Error in creating related person.'));
    yield put(saveCommunicationError(error));
  }
}

export function* updateCommunicationSaga(action) {
  try {
    if (action.communication) {
      yield call(updateCommunication, action.communication);
      yield call(action.handleSubmitting);
      yield put(goBack());
    }
  } catch (error) {
    yield put(showNotification('Error in updating related person.'));
    yield call(action.handleSubmitting);
    yield put(saveCommunicationError(error));
  }
}

export function* getEpisodeOfCaresSaga(action) {
  try {
    if (action.patientId) {
      const episodeOfCares = yield call(getEpisodeOfCares, action.patientId);
      yield put(getEpisodeOfCaresSuccess(episodeOfCares));
    }
  } catch (error) {
    yield put(showNotification('Error in getting episode of care!'));
    yield put(saveCommunicationError(error));
  }
}


export function* watchCreateCommunicationSaga() {
  yield takeLatest(CREATE_COMMUNICATION, createCommunicationSaga);
}

export function* watchUpdateCommunicationSaga() {
  yield takeLatest(UPDATE_COMMUNICATION, updateCommunicationSaga);
}

export function* watchGetEpisodeOfCaresSaga() {
  yield takeLatest(GET_EPISODE_OF_CARES, getEpisodeOfCaresSaga);
}


export default function* rootSaga() {
  yield all([
    watchCreateCommunicationSaga(),
    watchUpdateCommunicationSaga(),
    watchGetEpisodeOfCaresSaga(),
  ]);
}
