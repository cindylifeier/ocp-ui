import { takeLatest, call, put, select } from 'redux-saga/effects';
import { GET_LOOKUPS, USPSSTATES } from '../App/constants';
import { makeSelectUspsStates } from '../App/selectors';
import { getLookupsError, getLookupsFromStore, getLookupsSuccess } from '../App/actions';
import getLookups from './api';
//
// export function* getUsState(action) {
//   try {
//     let usStates = yield select(makeSelectUspsStates());
//     if (usStates && usStates.length > 0) {
//       yield put(getLookupsFromStore());
//     } else if (usStates.length === 0) {
//       usStates = yield call(getLookups, action.lookupTypes);
//       yield put(getLookupsSuccess(usStates));
//     }
//   } catch (err) {
//     yield put(getLookupsError(err));
//   }
// }

export function* getLookupData(action) {
  try {
    let lookups;
    const lookupTypeNotInStore = [];
    if (action.lookupTypes.includes(USPSSTATES)) {
      const uspsStates = yield select(makeSelectUspsStates());
      if (uspsStates && uspsStates.length === 0) {
        lookupTypeNotInStore.push(USPSSTATES);
      }
    }
    if (lookupTypeNotInStore.length > 0) {
      lookups = yield call(getLookups, action.lookupTypes);
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
  yield takeLatest(GET_LOOKUPS, getLookupData);
}
