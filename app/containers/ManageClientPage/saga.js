// import { take, call, put, select } from 'redux-saga/effects';

// Individual exports for testing
import { all, call, put, takeLatest } from 'redux-saga/effects';

import { showNotification } from 'containers/Notification/actions';
import { getClients } from 'containers/SmartAppLauncher/api';
import { saveClientError, saveClientSuccess, getClientsSuccess, getClientsError } from './actions';
import { saveClient } from './api';
import { GET_CLIENTS, SAVE_CLIENT } from './constants';

export function* saveClientWorker(action) {
  try {
    const clientMetaDto = yield call(saveClient, action.clientFormData);
    yield put(showNotification(`Successfully ${getNotificationAction(action.clientFormData)} the SMART app.`));
    yield call(action.handleSubmitting);
    yield put(saveClientSuccess(clientMetaDto));
  } catch (error) {
    yield put(showNotification(`Failed to ${getNotificationAction(action.clientFormData)} the SMART app.`));
    yield call(action.handleSubmitting);
    yield put(saveClientError(error));
  }
}

export function* getClientsSaga() {
  try {
    const clients = yield call(getClients);
    yield put(getClientsSuccess(clients));
  } catch (error) {
    yield put(getClientsError(error));
    yield put(showNotification('Failed to retrieve SMART Apps.'));
  }
}

function getNotificationAction(clientFormData) {
  let action = 'create';
  if (clientFormData.isEdit) {
    action = 'edit';
  }
  return action;
}

export function* watchSaveClientSaga() {
  yield [
    takeLatest(SAVE_CLIENT, saveClientWorker),
  ];
}

export function* watchGetClientsSaga() {
  yield takeLatest(GET_CLIENTS, getClientsSaga);
}

export default function* rootSaga() {
  yield all([
    watchGetClientsSaga(),
    watchSaveClientSaga(),
  ]);
}
