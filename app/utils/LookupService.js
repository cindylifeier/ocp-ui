import { select } from 'redux-saga/effects';
import {
  ADDRESSTYPE,
  ADDRESSUSE,
  IDENTIFIERSYSTEM,
  LOCATIONSTATUS,
  LOCATIONTYPE,
  TELECOMSYSTEM,
  TELECOMUSE,
  USPSSTATES,
} from '../containers/App/constants';
import {
  makeSelectAddressTypes,
  makeSelectAddressUses,
  makeSelectIdentifierSystems,
  makeSelectLocationStatuses,
  makeSelectLocationTypes,
  makeSelectTelecomSystems,
  makeSelectTelecomUses,
  makeSelectUspsStates,
} from '../containers/App/selectors';
import getApiBaseUrl from '../apiBaseUrlConfig';
import request from './request';


function* isLookupTypeInStore(selectedTypes, verifyingType, makeSelectorType) {
  if (selectedTypes.includes(verifyingType)) {
    const dataFromStore = yield select(makeSelectorType());
    if (dataFromStore && dataFromStore.length > 0) {
      return true;
    }
  }
  return false;
}

export function* getLookupTypesNotInStore(action) {
  const lookupTypesNotInStore = [];
  if (!(yield isLookupTypeInStore(action.lookupTypes, USPSSTATES, makeSelectUspsStates))
    && action.lookupTypes.includes(USPSSTATES)) {
    lookupTypesNotInStore.push(USPSSTATES);
  }
  if (!(yield isLookupTypeInStore(action.lookupTypes, LOCATIONSTATUS, makeSelectLocationStatuses))
    && action.lookupTypes.includes(LOCATIONSTATUS)) {
    lookupTypesNotInStore.push(LOCATIONSTATUS);
  }
  if (!(yield isLookupTypeInStore(action.lookupTypes, LOCATIONTYPE, makeSelectLocationTypes))
    && action.lookupTypes.includes(LOCATIONTYPE)) {
    lookupTypesNotInStore.push(LOCATIONTYPE);
  }
  if (!(yield isLookupTypeInStore(action.lookupTypes, ADDRESSTYPE, makeSelectAddressTypes))
    && action.lookupTypes.includes(ADDRESSTYPE)) {
    lookupTypesNotInStore.push(ADDRESSTYPE);
  }
  if (!(yield isLookupTypeInStore(action.lookupTypes, ADDRESSUSE, makeSelectAddressUses))
    && action.lookupTypes.includes(ADDRESSUSE)) {
    lookupTypesNotInStore.push(ADDRESSUSE);
  }
  if (!(yield isLookupTypeInStore(action.lookupTypes, IDENTIFIERSYSTEM, makeSelectIdentifierSystems))
    && action.lookupTypes.includes(IDENTIFIERSYSTEM)) {
    lookupTypesNotInStore.push(IDENTIFIERSYSTEM);
  }
  if (!(yield isLookupTypeInStore(action.lookupTypes, TELECOMSYSTEM, makeSelectTelecomSystems))
    && action.lookupTypes.includes(TELECOMSYSTEM)) {
    lookupTypesNotInStore.push(TELECOMSYSTEM);
  }
  if (!(yield isLookupTypeInStore(action.lookupTypes, TELECOMUSE, makeSelectTelecomUses))
    && action.lookupTypes.includes(TELECOMUSE)) {
    lookupTypesNotInStore.push(TELECOMUSE);
  }

  return lookupTypesNotInStore;
}

export function getLookups(lookupTypes) {
  const apiBaseURL = getApiBaseUrl();
  const lookupKeyList = lookupTypes.join();
  const requestURL = `${apiBaseURL}/lookups?lookUpTypeList=${lookupKeyList}`;
  return request(requestURL);
}
