import { createSelector } from 'reselect';

/**
 * Direct selector to the managePatientPage state domain
 */
const selectManagePatientPageDomain = (state) => state.get('managePatientPage');

/**
 * Other specific selectors
 */


/**
 * Default selector used by ManagePatientPage
 */

const makeSelectManagePatientPage = () => createSelector(
  selectManagePatientPageDomain,
  (substate) => substate.toJS()
);

export default makeSelectManagePatientPage;
export {
  selectManagePatientPageDomain,
};
