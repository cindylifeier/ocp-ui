import { createSelector } from 'reselect';

/**
 * Direct selector to the careCoordinatorUpcomingAppointment state domain
 */
const selectCareCoordinatorUpcomingAppointmentDomain = (state) => state.get('careCoordinatorUpcomingAppointment');

/**
 * Other specific selectors
 */


/**
 * Default selector used by CareCoordinatorUpcomingAppointment
 */

const makeSelectCareCoordinatorUpcomingAppointment = () => createSelector(
  selectCareCoordinatorUpcomingAppointmentDomain,
  (substate) => substate.toJS()
);

export default makeSelectCareCoordinatorUpcomingAppointment;
export {
  selectCareCoordinatorUpcomingAppointmentDomain,
};
