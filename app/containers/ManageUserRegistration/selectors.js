import { createSelector } from 'reselect';

/**
 * Direct selector to the manageUserRegistration state domain
 */
const selectManageUserRegistrationDomain = (state) => state.get('manageUserRegistration');

/**
 * Other specific selectors
 */


/**
 * Default selector used by ManageUserRegistration
 */

const makeSelectManageUserRegistration = () => createSelector(
  selectManageUserRegistrationDomain,
  (substate) => substate.toJS()
);

export default makeSelectManageUserRegistration;
export {
  selectManageUserRegistrationDomain,
};
