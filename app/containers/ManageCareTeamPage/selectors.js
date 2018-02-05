import { createSelector } from 'reselect';

/**
 * Direct selector to the manageCareTeamPage state domain
 */
const selectManageCareTeamPageDomain = (state) => state.get('manageCareTeamPage');

/**
 * Other specific selectors
 */

const makeSelectPatient = () => createSelector(
  selectManageCareTeamPageDomain,
  (substate) => substate && substate.get('patient'),
);

const makeSelectCareTeam = () => createSelector(
  selectManageCareTeamPageDomain,
  (substate) => substate && substate.get('careTeam'),
);

export {
  selectManageCareTeamPageDomain,
  makeSelectPatient,
  makeSelectCareTeam,
};
