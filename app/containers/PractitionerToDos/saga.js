import { all, call, put, takeLatest } from 'redux-saga/effects';
import { GET_PRACTITIONER_TO_DOS } from 'containers/PractitionerToDos/constants';
import {
  getPractitionerToDoError,
  getPractitionerToDoSuccess,
} from 'containers/PractitionerToDos/actions';
import React from 'react';
import { FormattedMessage } from 'react-intl';
import { showNotification } from 'containers/Notification/actions';
import { getPractitionerToDos } from './api';
import messages from './messages';

export function* getPractitionerToDosSaga(action) {
  try {
    const toDos = yield call(getPractitionerToDos, action.practitionerId, action.definition);
    yield put(getPractitionerToDoSuccess(toDos));
  } catch (error) {
    yield put(showNotification(<FormattedMessage {...messages.noToDoError} />));
    yield put(getPractitionerToDoError(error));
  }
}


export function* watchGetPractitionerToDosSaga() {
  yield takeLatest(GET_PRACTITIONER_TO_DOS, getPractitionerToDosSaga);
}

export default function* rootSaga() {
  yield all([
    watchGetPractitionerToDosSaga(),
  ]);
}
