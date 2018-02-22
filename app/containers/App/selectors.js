import { createSelector } from 'reselect';

const selectGlobalDomain = (state) => state.get('global');

const selectRoute = (state) => state.get('route');

const makeSelectLocation = () => createSelector(
  selectRoute,
  (routeState) => routeState.get('location').toJS(),
);

export default selectGlobalDomain;


const makeSelectPatient = () => createSelector(
  selectGlobalDomain,
  (substate) => substate && substate.get('selectedPatient'),
);

export {
  makeSelectLocation,
  makeSelectPatient,
};
