import { all, call, put, takeLatest } from 'redux-saga/effects';
import { goBack } from 'react-router-redux';
import { POST_RELATED_PERSON, PUT_RELATED_PERSON } from './constants';
import { showNotification } from '../Notification/actions';
import { createRelatedPersonError } from './actions';
import { postRelatedPerson, putRelatedPerson } from './api';


export function* postRelatedPersonWorker(action) {
  try {
    console.log(action);
    if (action.relatedPerson) {
      yield call(postRelatedPerson, action.relatedPerson);
      yield put(goBack());
    }
  } catch (error) {
    yield put(showNotification('Error in creating related person.'));
    yield put(createRelatedPersonError(error));
  }
}


export function* putRelatedPersonWorker(action) {
  try {
    if (action.relatedPerson) {
      yield call(putRelatedPerson, action.relatedPerson);
      yield put(goBack());
    }
  } catch (error) {
    yield put(showNotification('Error in updating related person.'));
    yield put(createRelatedPersonError(error));
  }
}


export function* watchPostRelatedPerson() {
  yield takeLatest(POST_RELATED_PERSON, postRelatedPersonWorker);
}


export function* watchPutRelatedPerson() {
  yield takeLatest(PUT_RELATED_PERSON, putRelatedPersonWorker);
}


export default function* rootSaga() {
  yield all([
    watchPostRelatedPerson(),
    watchPutRelatedPerson(),
  ]);
}
