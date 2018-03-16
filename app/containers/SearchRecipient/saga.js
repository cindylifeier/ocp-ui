import { call, put, takeLatest, all } from 'redux-saga/effects';
import { getRecipientsError, getRecipientsSuccess } from 'containers/SearchRecipient/actions';
import { GET_RECIPIENTS } from 'containers/SearchRecipient/constants';
import { getRecipients } from 'containers/SearchRecipient/api';
import { showNotification } from 'containers/Notification/actions';

export function* getRecipientsSaga(action) {
  try {
    if (action.patientId) {
      // console.log(action.patientId);
      const recipients = yield call(getRecipients, action.patientId, action.communicationId);
      // TODO: Remove at before merge to master
      // const recipients = [
      //   { reference: 'Practitioner/13703', display: 'Monsieur Noysalt BALOIEYL', checked: true },
      //   { reference: 'Practitioner/316533', display: 'Madame Poynula BASKOALTXNA', checked: true },
      //   { reference: 'Practitioner/1192278', display: 'Mademoiselle Cobualla VOPHASAT', checked: false },
      //   { reference: 'Practitioner/1187300', display: 'Monsieur Phunuppa WALDSAMOUSA', checked: true },
      //   { reference: 'Practitioner/1154566', display: 'Madame Nuldo BASSAHOUN', checked: false },
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
