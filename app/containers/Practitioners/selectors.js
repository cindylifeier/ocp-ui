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

export {
  selectPractitionersDomain,
  makeSelectSearchLoading,
  makeSelectSearchError,
  makeSelectSearchResult,
};
