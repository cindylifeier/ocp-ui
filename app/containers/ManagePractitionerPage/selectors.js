import { createSelector } from 'reselect';

/**
 * Direct selector to the managePractitionerPage state domain
 */
const selectManagePractitionerPageDomain = (state) => state.get('managePractitionerPage');

/**
 * Other specific selectors
 */


/**
 * Default selector used by ManagePractitionerPage
 */

const makeSelectManagePractitionerPage = () => createSelector(
  selectManagePractitionerPageDomain,
  (substate) => substate.toJS()
);

export default makeSelectManagePractitionerPage;
export {
  selectManagePractitionerPageDomain,
};
