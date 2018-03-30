import { createSelector } from 'reselect';

/**
 * Direct selector to the practitionerAppointments state domain
 */
const selectPractitionerAppointmentsDomain = (state) => state.get('practitionerAppointments');

/**
 * Other specific selectors
 */


/**
 * Default selector used by PractitionerAppointments
 */

const makeSelectPractitionerAppointments = () => createSelector(
  selectPractitionerAppointmentsDomain,
  (substate) => substate.toJS()
);

export default makeSelectPractitionerAppointments;
export {
  selectPractitionerAppointmentsDomain,
};
