import { call, put, takeLatest, all } from 'redux-saga/effects';
import { getRecipientsError, getRecipientsSuccess } from 'containers/SearchRecipient/actions';
import { GET_RECIPIENTS } from 'containers/SearchRecipient/constants';
import { getRecipients } from 'containers/SearchRecipient/api';
import { showNotification } from 'containers/Notification/actions';

export function* getRecipientsSaga(action) {
  try {
    if (action.patientId) {
      console.log(action.patientId);
      const recipients = yield call(getRecipients, action.patientId, action.communicationId);

      // const recipients = [
      //   { reference: 'Practitioner/2658', display: 'Govind Shrestha', checked: true },
      //   { reference: 'Patient/2659', display: 'Esono', checked: true },
      //   { reference: 'Patient/2660', display: 'Test', checked: false },
      //   { reference: 'RelatedPerson/2661', display: 'Test2', checked: true },
      //   { reference: 'Practitioner/2662', display: 'Test3', checked: false },
      //
      // ];
      yield put(getRecipientsSuccess(recipients));
    }
  } catch (error) {
    yield put(showNotification('No recipient found!!!'));
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
