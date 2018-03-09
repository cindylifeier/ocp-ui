import { createSelector } from 'reselect';

/**
 * Direct selector to the upcomingAppointments state domain
 */
const selectUpcomingAppointmentsDomain = (state) => state.get('upcomingAppointments');

/**
 * Other specific selectors
 */


/**
 * Default selector used by UpcomingAppointments
 */

const makeSelectUpcomingAppointments = () => createSelector(
  selectUpcomingAppointmentsDomain,
  (substate) => substate.toJS()
);

export default makeSelectUpcomingAppointments;
export {
  selectUpcomingAppointmentsDomain,
};