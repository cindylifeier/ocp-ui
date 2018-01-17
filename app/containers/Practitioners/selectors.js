import { createSelector } from 'reselect';

/**
 * Direct selector to the practitioners state domain
 */
const selectPractitionersDomain = (state) => state.get('practitioners');

/**
 * Other specific selectors
 */

const makeSelectSearchLoading = () => createSelector(
  selectPractitionersDomain,
  (practitionersState) => practitionersState.get('loading'),
);

const makeSelectSearchError = () => createSelector(
  selectPractitionersDomain,
  (practitionersState) => practitionersState.get('error'),
);

const makeSelectSearchResult = () => createSelector(
  selectPractitionersDomain,
  (practitionersState) => practitionersState.getIn(['searchPractitioners', 'result']),
);

const makeSelectQuerySearchTerms = () => createSelector(
  selectPractitionersDomain,
  (practitionersState) => practitionersState.getIn(['searchPractitioners', 'queryParameters', 'searchTerms']),
);

const makeSelectQuerySearchType = () => createSelector(
  selectPractitionersDomain,
  (practitionersState) => practitionersState.getIn(['searchPractitioners', 'queryParameters', 'searchType']),
);

const makeSelectQueryIncludeInactive = () => createSelector(
  selectPractitionersDomain,
  (practitionersState) => practitionersState.getIn(['searchPractitioners', 'queryParameters', 'includeInactive']),
);

const makeSelectCurrentPageSize = () => createSelector(
  selectPractitionersDomain,
  (practitionersState) => practitionersState.getIn(['searchPractitioners', 'currentPageSize']),
);

const makeSelectCurrentPage = () => createSelector(
  selectPractitionersDomain,
  (practitionersState) => practitionersState.getIn(['searchPractitioners', 'currentPage']),
);

const makeSelectTotalPages = () => createSelector(
  selectPractitionersDomain,
  (practitionersState) => practitionersState.getIn(['searchPractitioners', 'totalPages']),
);

export {
  selectPractitionersDomain,
  makeSelectSearchLoading,
  makeSelectSearchError,
  makeSelectQuerySearchTerms,
  makeSelectQuerySearchType,
  makeSelectQueryIncludeInactive,
  makeSelectSearchResult,
  makeSelectCurrentPageSize,
  makeSelectCurrentPage,
  makeSelectTotalPages,
};
