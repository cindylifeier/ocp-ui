import { createSelector } from 'reselect';

const selectGlobal = (state) => state.get('global');

const selectRoute = (state) => state.get('route');

const makeSelectLocation = () => createSelector(
  selectRoute,
  (routeState) => routeState.get('location').toJS()
);

const makeSelectUspsStates = () => createSelector(
  selectGlobal,
  (globalState) => globalState.get('uspsStates').toJS()
);

const makeSelectLocationTypes = () => createSelector(
  selectGlobal,
  (globalState) => globalState.get('locationTypes').toJS()
);

const makeSelectLocationStatuses = () => createSelector(
  selectGlobal,
  (globalState) => globalState.get('locationStatuses').toJS()
);

const makeSelectAddressTypes = () => createSelector(
  selectGlobal,
  (globalState) => globalState.get('addressTypes').toJS()
);

const makeSelectAddressUses = () => createSelector(
  selectGlobal,
  (globalState) => globalState.get('addressUses').toJS()
);

const makeSelectIdentifierSystems = () => createSelector(
  selectGlobal,
  (globalState) => globalState.get('identifierSystems').toJS()
);

const makeSelectTelecomSystems = () => createSelector(
  selectGlobal,
  (globalState) => globalState.get('telecomSystems').toJS()
);

const makeSelectTelecomUses = () => createSelector(
  selectGlobal,
  (globalState) => globalState.get('telecomUses').toJS()
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
};
