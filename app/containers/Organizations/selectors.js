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


const makeSelectCurrentPage = () => createSelector(
  selectOrganizationsDomain,
  (substate) => substate.getIn(['searchOrganizations', 'currentPage']),
);

const makeSelectTotalNumberOfPages = () => createSelector(
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
  makeSelectCurrentPage,
  makeSelectTotalNumberOfPages,
  makeSelectSearchOrganizationResult,
};
