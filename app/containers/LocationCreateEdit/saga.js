import { takeLatest, put, call } from 'redux-saga/effects';
import {
  GET_LOCATION_LOOKUPS,
} from '../App/constants';
import { getLookupsError, getLookupsFromStore, getLookupsSuccess } from '../App/actions';
import { getLookupTypesNotInStore, getLookups } from '../../utils/LookupService';


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
export default function* watchGetUsStatesSaga() {
  yield takeLatest(GET_LOCATION_LOOKUPS, getLookupData);
}
