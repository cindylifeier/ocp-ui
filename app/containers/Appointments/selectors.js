import { createSelector } from 'reselect';

/**
 * Direct selector to the appointments state domain
 */
const selectAppointmentsDomain = (state) => state.get('appointments');

/**
 * Other specific selectors
 */


/**
 * Default selector used by Appointments
 */

const makeSelectAppointments = () => createSelector(
  selectAppointmentsDomain,
  (substate) => substate.toJS()
);

export default makeSelectAppointments;
export {
  selectAppointmentsDomain,
};
