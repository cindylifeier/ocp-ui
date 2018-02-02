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

export {
  selectManagePractitionerPageDomain,
  makeSelectSavePractitionerError,
  makeSelectPractitioner,
};
