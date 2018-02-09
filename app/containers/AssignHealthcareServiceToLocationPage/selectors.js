import { createSelector } from 'reselect';

/**
 * Direct selector to the assignHealthCareServiceToLocationPage state domain
 */
const selectAssignHealthCareServiceToLocationPageDomain = (state) => state.get('assignHealthCareServiceToLocationPage');

/**
 * Other specific selectors
 */
const makeSelectHealthcareServices = () => createSelector(
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

const makeSelectIncludeInactive = () => createSelector(
  selectAssignHealthCareServiceToLocationPageDomain,
  (substate) => substate.get('includeInactive'),
);

const makeSelectOrganization = () => createSelector(
  selectAssignHealthCareServiceToLocationPageDomain,
  (substate) => substate.get('organization'),
);

const makeSelectLocation = () => createSelector(
  selectAssignHealthCareServiceToLocationPageDomain,
  (substate) => substate.get('location'),
);

export {
  selectAssignHealthCareServiceToLocationPageDomain,
  makeSelectHealthcareServices,
  makeSelectQueryLoading,
  makeSelectQueryError,
  makeSelectCurrentPage,
  makeSelectTotalNumberOfPages,
  makeSelectIncludeInactive,
  makeSelectOrganization,
  makeSelectLocation,
};
