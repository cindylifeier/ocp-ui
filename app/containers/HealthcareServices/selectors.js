import { createSelector } from 'reselect';

/**
 * Direct selector to the healthcareServices state domain
 */
const selectHealthcareServicesDomain = (state) => state.get('healthcareServices');

/**
 * Other specific selectors
 */
const makeSelectHealthcareServices = () => createSelector(
  selectHealthcareServicesDomain,
  (substate) => substate.get('data').toJS(),
);

const makeSelectQueryLoading = () => createSelector(
  selectHealthcareServicesDomain,
  (substate) => substate.get('loading'),
);

const makeSelectQueryError = () => createSelector(
  selectHealthcareServicesDomain,
  (substate) => substate.get('error'),
);

const makeSelectCurrentPage = () => createSelector(
  selectHealthcareServicesDomain,
  (substate) => substate.get('currentPage'),
);

const makeSelectTotalNumberOfPages = () => createSelector(
  selectHealthcareServicesDomain,
  (substate) => substate.get('totalNumberOfPages'),
);

const makeSelectIncludeInactive = () => createSelector(
  selectHealthcareServicesDomain,
  (substate) => substate.get('includeInactive'),
);

const makeSelectOrganization = () => createSelector(
  selectHealthcareServicesDomain,
  (substate) => substate.get('organization'),
);

const makeSelectLocation = () => createSelector(
  selectHealthcareServicesDomain,
  (substate) => substate.get('location'),
);


export default makeSelectHealthcareServices;
export {
  makeSelectHealthcareServices,
  makeSelectQueryLoading,
  makeSelectQueryError,
  makeSelectCurrentPage,
  makeSelectTotalNumberOfPages,
  makeSelectIncludeInactive,
  makeSelectOrganization,
  makeSelectLocation,
};
