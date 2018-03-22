import { createSelector } from 'reselect';

/**
 * Direct selector to the organizations state domain
 */
const selectOrganizationsDomain = (state) => state.get('organizations');

/**
 * Other specific selectors
 */


/**
 * Default selector used by Organizations
 */

const makeSelectOrganizations = () => createSelector(
  selectOrganizationsDomain,
  (substate) => substate.toJS()
);


const makeSelectCurrentPage = () => createSelector(
  selectOrganizationsDomain,
  (substate) => substate.get('currentPage'),
);

const makeSelectCurrentPageSize = () => createSelector(
  selectOrganizationsDomain,
  (substate) => substate.get('currentPageSize'),
);

const makeSelectTotalNumberOfPages = () => createSelector(
  selectOrganizationsDomain,
  (substate) => substate.get('totalNumberOfPages'),
);

const makeSelectTotalElements = () => createSelector(
  selectOrganizationsDomain,
  (substate) => substate.get('totalElements'),
);

const makeSelectOrganizationsData = () => createSelector(
  selectOrganizationsDomain,
  (substate) => substate && substate.get('data').toJS(),
);

export {
  selectOrganizationsDomain,
  makeSelectOrganizations,
  makeSelectCurrentPage,
  makeSelectCurrentPageSize,
  makeSelectTotalNumberOfPages,
  makeSelectTotalElements,
  makeSelectOrganizationsData,
};
