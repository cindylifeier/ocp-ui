import { takeLatest, call, put } from 'redux-saga/effects';
import { GET_LOOKUPS } from '../App/constants';
import { fetchLookups, getLookupTypesNotInStore } from '../../utils/LookupService';
import { getLookupsError, getLookupsFromStore, getLookupsSuccess } from '../App/actions';


export function* getLookups(action) {
  try {
    const lookupTypesNotInStore = yield getLookupTypesNotInStore(action);
    if (lookupTypesNotInStore.length > 0) {
      const lookups = yield call(fetchLookups, lookupTypesNotInStore);
      yield put(getLookupsSuccess(lookups));
    } else {
      yield put(getLookupsFromStore());
    }
  } catch (err) {
    yield put(getLookupsError(err));
  }
}

export default function* watchGetLookupsSaga() {
  yield takeLatest(GET_LOOKUPS, getLookups);
}
