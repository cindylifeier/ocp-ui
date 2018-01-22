import { takeLatest, call, put } from 'redux-saga/effects';


import { GET_PATIENT_LOOKUPS } from '../App/constants';
import { getLookupsError, getLookupsFromStore, getLookupsSuccess } from '../App/actions';
import { getLookups, getLookupTypesNotInStore } from '../../utils/LookupService';

export function* getLookupData(action) {
  try {
    const lookupTypesNotInStore = yield getLookupTypesNotInStore(action);
    if (lookupTypesNotInStore.length > 0) {
      const lookups = yield call(getLookups, lookupTypesNotInStore);
      yield put(getLookupsSuccess(lookups));
    } else {
      yield put(getLookupsFromStore());
    }
  } catch (err) {
    yield put(getLookupsError(err));
  }
}
// Individual exports for testing
export default function* defaultSaga() {
  yield takeLatest(GET_PATIENT_LOOKUPS, getLookupData);
}
