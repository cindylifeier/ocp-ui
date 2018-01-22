import { takeLatest, call, put, select } from 'redux-saga/effects';
import {
  ADDRESSTYPE, ADDRESSUSE, GET_LOCATION_LOOKUPS, GET_PATIENT_LOOKUPS, IDENTIFIERSYSTEMS, LOCATIONSTATUS, LOCATIONTYPE,
  TELECOMSYSTEM, TELECOMUSE,
  USPSSTATES,
} from '../App/constants';
import {
  makeSelectAddressTypes, makeSelectAddressUses, makeSelectIdentifierSystems, makeSelectLocationStatuses,
  makeSelectLocationTypes,
  makeSelectTelecomSystems, makeSelectTelecomUses,
  makeSelectUspsStates,
} from '../App/selectors';
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

function* isLookupTypeInStore(selectedTypes, verifyingType, makeSelectorType) {
  if (selectedTypes.includes(verifyingType)) {
    const dataFromStore = yield select(makeSelectorType());
    if (dataFromStore && dataFromStore.length > 0) {
      return true;
    }
  }
  console.log(false);
  return false;
}


export function* getLookupData(action) {
  try {
    let lookups;
    const lookupTypesNotInStore = [];
    if (!(yield isLookupTypeInStore(action.lookupTypes, USPSSTATES, makeSelectUspsStates)) && action.lookupTypes.includes(USPSSTATES)) {
      lookupTypesNotInStore.push(USPSSTATES);
    }
    if (!(yield isLookupTypeInStore(action.lookupTypes, LOCATIONSTATUS, makeSelectLocationStatuses))
      && action.lookupTypes.includes(LOCATIONSTATUS)) {
      lookupTypesNotInStore.push(LOCATIONSTATUS);
    }
    if (!(yield isLookupTypeInStore(action.lookupTypes, LOCATIONTYPE, makeSelectLocationTypes)) && action.lookupTypes.includes(LOCATIONTYPE)) {
      lookupTypesNotInStore.push(LOCATIONTYPE);
    }
    if (!(yield isLookupTypeInStore(action.lookupTypes, ADDRESSTYPE, makeSelectAddressTypes)) && action.lookupTypes.includes(ADDRESSTYPE)) {
      lookupTypesNotInStore.push(ADDRESSTYPE);
    }
    if (!(yield isLookupTypeInStore(action.lookupTypes, ADDRESSUSE, makeSelectAddressUses)) && action.lookupTypes.includes(ADDRESSUSE)) {
      lookupTypesNotInStore.push(ADDRESSUSE);
    }
    if (!(yield isLookupTypeInStore(action.lookupTypes, IDENTIFIERSYSTEMS, makeSelectIdentifierSystems)) && action.lookupTypes.includes(IDENTIFIERSYSTEMS)) {
      lookupTypesNotInStore.push(IDENTIFIERSYSTEMS);
    }
    if (!(yield isLookupTypeInStore(action.lookupTypes, TELECOMSYSTEM, makeSelectTelecomSystems)) && action.lookupTypes.includes(TELECOMSYSTEM)) {
      lookupTypesNotInStore.push(TELECOMSYSTEM);
    }
    if (!(yield isLookupTypeInStore(action.lookupTypes, TELECOMUSE, makeSelectTelecomUses)) && action.lookupTypes.includes(TELECOMUSE)) {
      lookupTypesNotInStore.push(TELECOMUSE);
    }

    if (lookupTypesNotInStore.length > 0) {
      lookups = yield call(getLookups, lookupTypesNotInStore);
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
  yield takeLatest(GET_PATIENT_LOOKUPS, getLookupData);
}
