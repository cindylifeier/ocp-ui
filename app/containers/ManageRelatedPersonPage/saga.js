import { all, call, put, takeLatest } from 'redux-saga/effects';
import { goBack } from 'react-router-redux';
import { CREATE_RELATED_PERSON, UPDATE_RELATED_PERSON } from './constants';
import { showNotification } from '../Notification/actions';
import { saveRelatedPersonError } from './actions';
import { createRelatedPerson, updateRelatedPerson } from './api';


export function* createRelatedPersonSaga(action) {
  try {
    if (action.relatedPerson) {
      yield call(createRelatedPerson, action.relatedPerson);
      yield put(goBack());
    }
  } catch (error) {
    yield put(showNotification('Error in creating related person.'));
    yield put(saveRelatedPersonError(error));
  }
}

export function* updateRelatedPersonSaga(action) {
  try {
    if (action.relatedPerson) {
      yield call(updateRelatedPerson, action.relatedPerson);
      yield call(action.handleSubmitting);
      yield put(goBack());
    }
  } catch (error) {
    yield put(showNotification('Error in updating related person.'));
    yield call(action.handleSubmitting);
    yield put(saveRelatedPersonError(error));
  }
}


export function* watchCreateRelatedPersonSaga() {
  yield takeLatest(CREATE_RELATED_PERSON, createRelatedPersonSaga);
}


export function* watchUpdateRelatedPersonSaga() {
  yield takeLatest(UPDATE_RELATED_PERSON, updateRelatedPersonSaga);
}


export default function* rootSaga() {
  yield all([
    watchCreateRelatedPersonSaga(),
    watchUpdateRelatedPersonSaga(),
  ]);
}
