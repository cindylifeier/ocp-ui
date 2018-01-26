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

export {
  selectManagePractitionerPageDomain,
  makeSelectSavePractitionerError,
};
