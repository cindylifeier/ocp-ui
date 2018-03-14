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
  (substate) => substate.get('data').toJS(),
);

const makeSelectCurrentPage = () => createSelector(
  selectLocationsDomain,
  (substate) => substate.get('currentPage'),
);

const makeSelectTotalNumberOfPages = () => createSelector(
  selectLocationsDomain,
  (substate) => substate.get('totalNumberOfPages'),
);

const makeSelectIncludeInactive = () => createSelector(
  selectLocationsDomain,
  (substate) => substate.get('includeInactive'),
);

const makeSelectIncludeSuspended = () => createSelector(
  selectLocationsDomain,
  (substate) => substate.get('includeSuspended'),
);


export {
  makeSelectLocations,
  selectLocationsDomain,
  makeSelectCurrentPage,
  makeSelectTotalNumberOfPages,
  makeSelectIncludeInactive,
  makeSelectIncludeSuspended,
};
