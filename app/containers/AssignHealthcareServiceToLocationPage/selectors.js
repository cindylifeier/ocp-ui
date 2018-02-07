import { createSelector } from 'reselect';

/**
 * Direct selector to the assignHealthCareServiceToLocationPage state domain
 */
const selectAssignHealthCareServiceToLocationPageDomain = (state) => state.get('assignHealthCareServiceToLocationPage');

/**
 * Other specific selectors
 */


/**
 * Default selector used by AssignHealthCareServiceToLocationPage
 */

const makeSelectAssignHealthCareServiceToLocationPage = () => createSelector(
  selectAssignHealthCareServiceToLocationPageDomain,
  (substate) => substate.get('data').toJS(),
);

const makeSelectQueryLoading = () => createSelector(
  selectAssignHealthCareServiceToLocationPageDomain,
  (substate) => substate.get('loading'),
);

const makeSelectQueryError = () => createSelector(
  selectAssignHealthCareServiceToLocationPageDomain,
  (substate) => substate.get('error'),
);

const makeSelectCurrentPage = () => createSelector(
  selectAssignHealthCareServiceToLocationPageDomain,
  (substate) => substate.get('currentPage'),
);

const makeSelectTotalNumberOfPages = () => createSelector(
  selectAssignHealthCareServiceToLocationPageDomain,
  (substate) => substate.get('totalNumberOfPages'),
);

const makeSelectOrganization = () => createSelector(
  selectAssignHealthCareServiceToLocationPageDomain,
  (substate) => substate.get('organization'),
);

export default makeSelectAssignHealthCareServiceToLocationPage;
export {
  selectAssignHealthCareServiceToLocationPageDomain,
  makeSelectQueryLoading,
  makeSelectQueryError,
  makeSelectCurrentPage,
  makeSelectTotalNumberOfPages,
  makeSelectOrganization,
};
