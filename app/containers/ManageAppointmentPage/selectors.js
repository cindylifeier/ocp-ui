import { createSelector } from 'reselect';

/**
 * Direct selector to the manageAppointmentPage state domain
 */
const selectManageAppointmentPageDomain = (state) => state.get('manageAppointmentPage');

/**
 * Other specific selectors
 */


/**
 * Default selector used by ManageAppointmentPage
 */

const makeSelectManageAppointmentPage = () => createSelector(
  selectManageAppointmentPageDomain,
  (substate) => substate.toJS()
);

export default makeSelectManageAppointmentPage;
export {
  selectManageAppointmentPageDomain,
};
