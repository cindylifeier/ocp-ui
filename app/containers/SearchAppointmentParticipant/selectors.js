import { createSelector } from 'reselect';

/**
 * Direct selector to the searchAppointmentParticipant state domain
 */
const selectSearchAppointmentParticipantDomain = (state) => state.get('searchAppointmentParticipant');

/**
 * Other specific selectors
 */
const makeSelectHealthcareServiceReferences = () => createSelector(
  selectSearchAppointmentParticipantDomain,
  (subState) => subState && subState.get('healthcareServices'),
);

const makeSelectLocationReferences = () => createSelector(
  selectSearchAppointmentParticipantDomain,
  (subState) => subState && subState.get('locations'),
);

const makeSelectPractitionerReferences = () => createSelector(
  selectSearchAppointmentParticipantDomain,
  (subState) => subState && subState.get('practitioners'),
);

/**
 * Default selector used by SearchAppointmentParticipant
 */

export {
  selectSearchAppointmentParticipantDomain,
  makeSelectHealthcareServiceReferences,
  makeSelectLocationReferences,
  makeSelectPractitionerReferences,
};
