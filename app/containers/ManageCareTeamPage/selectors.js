import { createSelector } from 'reselect';

/**
 * Direct selector to the manageCareTeamPage state domain
 */
const selectManageCareTeamPageDomain = (state) => state.get('manageCareTeamPage');

/**
 * Other specific selectors
 */


/**
 * Default selector used by ManageCareTeamPage
 */

const makeSelectPatient = () => createSelector(
  selectManageCareTeamPageDomain,
  (substate) => substate && substate.get('patient'),
);

export {
  selectManageCareTeamPageDomain,
  makeSelectPatient,
};
