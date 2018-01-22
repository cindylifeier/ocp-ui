import { createSelector } from 'reselect';

/**
 * Direct selector to the manageOrganizationPage state domain
 */
const selectManageOrganizationPageDomain = (state) => state.get('manageOrganizationPage');

/**
 * Other specific selectors
 */


/**
 * Default selector used by ManageOrganizationPage
 */

const makeSelectManageOrganizationPage = () => createSelector(
  selectManageOrganizationPageDomain,
  (substate) => substate.toJS()
);

export default makeSelectManageOrganizationPage;
export {
  selectManageOrganizationPageDomain,
};
