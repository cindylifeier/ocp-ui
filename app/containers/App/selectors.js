import { createSelector } from 'reselect';
import {
  ADDRESSTYPE, ADDRESSUSE, IDENTIFIERSYSTEM, LOCATIONSTATUS, LOCATIONTYPE, TELECOMSYSTEM, TELECOMUSE,
  USPSSTATES,
} from './constants';

const selectGlobal = (state) => state.get('global');

const selectRoute = (state) => state.get('route');

const makeSelectLocation = () => createSelector(
  selectRoute,
  (routeState) => routeState.get('location').toJS()
);

const makeSelectUspsStates = () => createSelector(
  selectGlobal,
  (globalState) => globalState.get(USPSSTATES).toJS()
);

const makeSelectLocationTypes = () => createSelector(
  selectGlobal,
  (globalState) => globalState.get(LOCATIONTYPE).toJS()
);

const makeSelectLocationStatuses = () => createSelector(
  selectGlobal,
  (globalState) => globalState.get(LOCATIONSTATUS).toJS()
);

const makeSelectAddressTypes = () => createSelector(
  selectGlobal,
  (globalState) => globalState.get(ADDRESSTYPE).toJS()
);

const makeSelectAddressUses = () => createSelector(
  selectGlobal,
  (globalState) => globalState.get(ADDRESSUSE).toJS()
);

const makeSelectIdentifierSystems = () => createSelector(
  selectGlobal,
  (globalState) => globalState.get(IDENTIFIERSYSTEM).toJS()
);

const makeSelectTelecomSystems = () => createSelector(
  selectGlobal,
  (globalState) => globalState.get(TELECOMSYSTEM).toJS()
);

const makeSelectTelecomUses = () => createSelector(
  selectGlobal,
  (globalState) => globalState.get(TELECOMUSE).toJS()
);

const makeSelectLookups = (name) => createSelector(
  selectGlobal,
  (globalState) => globalState.get(name).toJS()
);

export {
  makeSelectLocation,
  makeSelectUspsStates,
  makeSelectLocationTypes,
  makeSelectLocationStatuses,
  makeSelectAddressTypes,
  makeSelectAddressUses,
  makeSelectIdentifierSystems,
  makeSelectTelecomUses,
  makeSelectTelecomSystems,
  makeSelectLookups,
};
