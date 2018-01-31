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

const makeSelectManageCareTeamPage = () => createSelector(
  selectManageCareTeamPageDomain,
  (substate) => substate.toJS()
);

export default makeSelectManageCareTeamPage;
export {
  selectManageCareTeamPageDomain,
};
