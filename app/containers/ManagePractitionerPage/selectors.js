import { createSelector } from 'reselect';

/**
 * Direct selector to the managePractitionerPage state domain
 */
const selectManagePractitionerPageDomain = (state) => state.get('managePractitionerPage');

/**
 * Other specific selectors
 */

const makeSelectSavePractitionerError = () => createSelector(
  selectManagePractitionerPageDomain,
  (subState) => subState.get('error'),
);

const makeSelectPractitioner = () => createSelector(
  selectManagePractitionerPageDomain,
  (subState) => subState && subState.get('practitioner'),
);

const makeSelectOrganizations = () => createSelector(
  selectManagePractitionerPageDomain,
  (substate) => substate.toJS()
);


const makeSelectCurrentPage = () => createSelector(
  selectManagePractitionerPageDomain,
  (substate) => substate.get('currentPage'),
);

const makeSelectTotalNumberOfPages = () => createSelector(
  selectManagePractitionerPageDomain,
  (substate) => substate.get('totalNumberOfPages'),
);

const makeSelectOrganizationsData = () => createSelector(
  selectManagePractitionerPageDomain,
  (substate) => substate && substate.get('data').toJS(),
);

export {
  selectManagePractitionerPageDomain,
  makeSelectSavePractitionerError,
  makeSelectPractitioner,
  makeSelectOrganizations,
  makeSelectCurrentPage,
  makeSelectTotalNumberOfPages,
  makeSelectOrganizationsData,
};
