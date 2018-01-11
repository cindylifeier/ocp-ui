import { createSelector } from 'reselect';

/**
 * Direct selector to the locations state domain
 */
const selectLocationsDomain = (state) => state.get('locations');

/**
 * Other specific selectors
 */


/**
 * Default selector used by Locations
 */

const makeSelectLocations = () => createSelector(
  selectLocationsDomain,
  (substate) => substate.get('locations')
);


const makeSelectOrganizationId = () => createSelector(
  selectLocationsDomain,
  (substate) => substate.get('organizationId'),
);

export default makeSelectLocations;

export {
  selectLocationsDomain,
  makeSelectOrganizationId,
};
