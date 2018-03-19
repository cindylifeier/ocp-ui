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
  (substate) => substate.toJS(),
);

const makeSelectListOrganizationCurrentPage = () => createSelector(
  selectOrganizationsDomain,
  (substate) => substate.getIn(['listOrganizations', 'currentPage']),
);

const makeSelectListOrganizationTotalNumberOfPages = () => createSelector(
  selectOrganizationsDomain,
  (substate) => substate.getIn(['listOrganizations', 'totalNumberOfPages']),
);

const makeSelectSearchOrganizationCurrentPage = () => createSelector(
  selectOrganizationsDomain,
  (substate) => substate.getIn(['searchOrganizations', 'currentPage']),
);

const makeSelectSearchOrganizationTotalNumberOfPages = () => createSelector(
  selectOrganizationsDomain,
  (substate) => substate.getIn(['searchOrganizations', 'totalNumberOfPages']),
);

const makeSelectSearchOrganizationResult = () => createSelector(
  selectOrganizationsDomain,
  (substate) => substate && substate.getIn(['searchOrganizations', 'result']).toJS(),
);

export {
  selectOrganizationsDomain,
  makeSelectOrganizations,
  makeSelectListOrganizationCurrentPage,
  makeSelectListOrganizationTotalNumberOfPages,
  makeSelectSearchOrganizationCurrentPage,
  makeSelectSearchOrganizationTotalNumberOfPages,
  makeSelectSearchOrganizationResult,
};
