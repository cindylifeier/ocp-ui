import { createSelector } from 'reselect';

/**
 * Direct selector to the patientAppointments state domain
 */
const selectPatientAppointmentsDomain = (state) => state.get('patientAppointments');

/**
 * Other specific selectors
 */


/**
 * Default selector used by PatientAppointments
 */

const makeSelectPatientAppointments = () => createSelector(
  selectPatientAppointmentsDomain,
  (substate) => substate.toJS()
);

export default makeSelectPatientAppointments;
export {
  selectPatientAppointmentsDomain,
};
