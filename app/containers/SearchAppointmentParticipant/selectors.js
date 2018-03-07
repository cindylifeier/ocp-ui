import { createSelector } from 'reselect';

/**
 * Direct selector to the searchAppointmentParticipant state domain
 */
const selectSearchAppointmentParticipantDomain = (state) => state.get('searchAppointmentParticipant');

/**
 * Other specific selectors
 */


/**
 * Default selector used by SearchAppointmentParticipant
 */

const makeSelectSearchAppointmentParticipant = () => createSelector(
  selectSearchAppointmentParticipantDomain,
  (substate) => substate.toJS()
);

export default makeSelectSearchAppointmentParticipant;
export {
  selectSearchAppointmentParticipantDomain,
};
