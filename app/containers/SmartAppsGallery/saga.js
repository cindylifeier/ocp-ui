import { all, call, put, takeLatest } from 'redux-saga/effects';
import { showNotification } from 'containers/Notification/actions';
import { getAppShortcutsError, getAppShortcutsSuccess } from './actions';
import { GET_APP_SHORTCUTS } from './constants';
import { getAppShortcuts } from './api';

function* getAppShortcutsSaga() {
  try {
    const appShortcuts = yield call(getAppShortcuts);
    yield put(getAppShortcutsSuccess(appShortcuts));
  } catch (error) {
    yield put(showNotification('Cannot get smart app shortcuts configuration.'));
    yield put(getAppShortcutsError(error));
  }
}

function* watchGetAppShortcutsSaga() {
  yield takeLatest(GET_APP_SHORTCUTS, getAppShortcutsSaga);
}

/**
 * Root saga manages watcher lifecycle
 */
export default function* rootSaga() {
  yield all([
    watchGetAppShortcutsSaga(),
  ]);
}
