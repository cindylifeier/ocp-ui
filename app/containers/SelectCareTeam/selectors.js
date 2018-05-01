import { createSelector } from 'reselect';

/**
 * Direct selector to the selectCareTeam state domain
 */
const selectSelectCareTeamDomain = (state) => state.get('selectCareTeam');

/**
 * Other specific selectors
 */


/**
 * Default selector used by SelectCareTeam
 */

const makeSelectSelectCareTeam = () => createSelector(
  selectSelectCareTeamDomain,
  (substate) => substate.toJS()
);

export default makeSelectSelectCareTeam;
export {
  selectSelectCareTeamDomain,
};
