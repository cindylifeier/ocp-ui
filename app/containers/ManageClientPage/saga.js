// import { take, call, put, select } from 'redux-saga/effects';

// Individual exports for testing
import { all, call, put, takeLatest } from 'redux-saga/effects';
import { SAVE_CLIENT } from 'containers/ManageClientPage/constants';
import { showNotification } from 'containers/Notification/actions';
import { goBack } from 'react-router-redux';
import { saveClientError } from './actions';
import { saveClient } from './api';

export function* saveClientWorker(action) {
  try {
    yield call(saveClient, action.clientFormData);
    yield put(showNotification(`Successfully ${getNotificationAction(action.clientFormData)} the SMART app.`));
    yield call(action.handleSubmitting);
    yield put(goBack());
  } catch (error) {
    yield put(showNotification(`Failed to ${getNotificationAction(action.clientFormData)} the SMART app.`));
    yield call(action.handleSubmitting);
    yield put(saveClientError(error));
  }
}

function getNotificationAction(clientFormData) {
  let action = 'create';
  if (clientFormData.isEdit) {
    action = 'edit';
  }
  return action;
}

export function* watchManageClientSaga() {
  yield [
    takeLatest(SAVE_CLIENT, saveClientWorker),
  ];
}

export default function* rootSaga() {
  yield all([
    watchManageClientSaga(),
  ]);
}
