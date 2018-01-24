import { createSelector } from 'reselect';
import {
  ADDRESSTYPE,
  ADDRESSUSE,
  IDENTIFIERSYSTEM,
  LOCATIONPHYSICALTYPE,
  LOCATIONSTATUS,
  PRACTITIONERROLES,
  TELECOMSYSTEM,
  TELECOMUSE,
  USPSSTATES,
} from './constants';

const selectGlobal = (state) => state.get('global');

const selectRoute = (state) => state.get('route');

const makeSelectLocation = () => createSelector(
  selectRoute,
  (routeState) => routeState.get('location').toJS(),
);

const makeSelectUspsStates = () => createSelector(
  selectGlobal,
  (globalState) => globalState.get(USPSSTATES).toJS(),
);

const makeSelectLocationPhysicalTypes = () => createSelector(
  selectGlobal,
  (globalState) => globalState.get(LOCATIONPHYSICALTYPE).toJS(),
);

const makeSelectLocationStatuses = () => createSelector(
  selectGlobal,
  (globalState) => globalState.get(LOCATIONSTATUS).toJS(),
);

const makeSelectAddressTypes = () => createSelector(
  selectGlobal,
  (globalState) => globalState.get(ADDRESSTYPE).toJS(),
);

const makeSelectAddressUses = () => createSelector(
  selectGlobal,
  (globalState) => globalState.get(ADDRESSUSE).toJS(),
);

const makeSelectIdentifierSystems = () => createSelector(
  selectGlobal,
  (globalState) => globalState.get(IDENTIFIERSYSTEM).toJS(),
);

const makeSelectTelecomSystems = () => createSelector(
  selectGlobal,
  (globalState) => globalState.get(TELECOMSYSTEM).toJS(),
);

const makeSelectTelecomUses = () => createSelector(
  selectGlobal,
  (globalState) => globalState.get(TELECOMUSE).toJS(),
);

const makeSelectPractitionerRoles = () => createSelector(
  selectGlobal,
  (globalState) => globalState.get(PRACTITIONERROLES).toJS(),
);

const makeSelectLookups = (name) => createSelector(
  selectGlobal,
  (globalState) => globalState.get(name).toJS(),
);

export {
  makeSelectLocation,
  makeSelectUspsStates,
  makeSelectLocationPhysicalTypes,
  makeSelectLocationStatuses,
  makeSelectAddressTypes,
  makeSelectAddressUses,
  makeSelectIdentifierSystems,
  makeSelectTelecomUses,
  makeSelectTelecomSystems,
  makeSelectPractitionerRoles,
  makeSelectLookups,
};
