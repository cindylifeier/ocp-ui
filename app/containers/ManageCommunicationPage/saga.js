import { all, call, put, takeLatest } from 'redux-saga/effects';
import { goBack } from 'react-router-redux';
import {
  CREATE_COMMUNICATION,
  UPDATE_COMMUNICATION,
  GET_EPISODE_OF_CARES,
  GET_PRACTITIONER,
  GET_COMMUNICATION,
} from './constants';
import { showNotification } from '../Notification/actions';
import { saveCommunicationError,
  getEpisodeOfCaresSuccess,
  getPractitionerSuccess,
  getPractitionerError,
  getCommunicationError,
  getCommunicationSuccess,
} from './actions';
import {
  createCommunication,
  updateCommunication,
  getEpisodeOfCares,
  getRequester,
  getCommunication,
} from './api';

export function* createCommunicationSaga(action) {
  try {
    if (action.communication) {
      yield call(createCommunication, action.communication);
      yield call(action.handleSubmitting);
      yield put(goBack());
    }
  } catch (error) {
    yield put(showNotification('Error in creating communication.'));
    yield call(action.handleSubmitting);
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
    yield put(showNotification('Error in updating communication.'));
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

// TODO Refactore when Practitioner profile is establish.
export function* getPractitionerSaga(action) {
  try {
    const practitioner = yield call(getRequester, action.practitionerId);
    yield put(getPractitionerSuccess(practitioner));
  } catch (err) {
    yield put(showNotification('Error in getting practitioner!'));
    yield put(getPractitionerError(err));
  }
}


export function* getCommunicationSaga(action) {
  try {
    const communication = yield call(getCommunication, action.communicationId);
    yield put(getCommunicationSuccess(communication));
  } catch (err) {
    yield put(showNotification('Error in getting communication!'));
    yield put(getCommunicationError(err));
  }
}
/**
 * Root saga manages watcher lifecycle
 */
export function* watchGetPractitionerSaga() {
  yield takeLatest(GET_PRACTITIONER, getPractitionerSaga);
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

export function* watchGetCommunicationSaga() {
  yield takeLatest(GET_COMMUNICATION, getCommunicationSaga);
}


export default function* rootSaga() {
  yield all([
    watchCreateCommunicationSaga(),
    watchUpdateCommunicationSaga(),
    watchGetEpisodeOfCaresSaga(),
    watchGetPractitionerSaga(),
    watchGetCommunicationSaga(),
  ]);
}
