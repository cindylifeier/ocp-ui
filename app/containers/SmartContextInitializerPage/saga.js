import { call, put, takeLatest } from 'redux-saga/effects';
import { showNotification } from 'containers/Notification/actions';
import { POST_CONTEXT } from './constants';
import { postContext } from './api';
import { postContextError, postContextSuccess } from './actions';

export function* postContextSaga({ launchId, context }) {
  try {
    const response = yield call(postContext, launchId, context);
    yield put(postContextSuccess(response));
    yield put(showNotification('SMART context has been submitted successfully.'));
  } catch (error) {
    yield put(postContextError(error));
    yield put(showNotification('Unable to submit SMART context.'));
  }
}

export default function* rootSaga() {
  yield takeLatest(POST_CONTEXT, postContextSaga);
}
