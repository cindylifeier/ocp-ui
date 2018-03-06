import isEmpty from 'lodash/isEmpty';
import { put, takeLatest, all } from 'redux-saga/effects';
import { getRecipientsError, getRecipientsSuccess } from 'containers/SearchRecipient/actions';
import { GET_RECIPIENTS } from 'containers/SearchRecipient/constants';
import { showNotification } from '../Notification/actions';

export function* getRecipientsSaga(action) {
  try {
    if (!isEmpty(action.patientId)) {
      // const recipients = yield call(getRecipients, action.patientId);
      const recipients = [
        { logicalId: '01', name: 'Test1', role: 'Role1' },
        { logicalId: '02', name: 'Test2', role: 'Role2' },
        { logicalId: '03', name: 'Test3', role: 'Role3' },
        { logicalId: '04', name: 'Test4', role: 'Role4' },
      ];
      yield put(getRecipientsSuccess(recipients));
    }
  } catch (error) {
    yield put(showNotification('No participant found'));
    yield put(getRecipientsError(error));
  }
}

export function* watchGetRecipients() {
  yield takeLatest(GET_RECIPIENTS, getRecipientsSaga);
}

export default function* rootSaga() {
  yield all([
    watchGetRecipients(),
  ]);
}
