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
  (substate) => substate.get('data').toJS()
);


const makeSelectOrganization = () => createSelector(
  selectLocationsDomain,
  (substate) => substate.get('organization'),
);

const makeSelectCurrentPage = () => createSelector(
  selectLocationsDomain,
  (substate) => substate.get('currentPage'),
);

const makeSelectCurrentPageSize = () => createSelector(
  selectLocationsDomain,
  (substate) => substate.get('currentPageSize'),
);

const makeSelectTotalNumberOfPages = () => createSelector(
  selectLocationsDomain,
  (substate) => substate.get('totalNumberOfPages'),
);


export {
  makeSelectLocations,
  selectLocationsDomain,
  makeSelectOrganization,
  makeSelectCurrentPage,
  makeSelectCurrentPageSize,
  makeSelectTotalNumberOfPages,
};
