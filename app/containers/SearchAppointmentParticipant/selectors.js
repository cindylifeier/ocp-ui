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

const makeSelectSearchAppointmentParticipantResults = () => createSelector(
  selectSearchAppointmentParticipantDomain,
  (subState) => subState.get('searchParticipantResult').toJS()
);

const makeSelectSelectedAppointmentParticipants = () => createSelector(
  selectSearchAppointmentParticipantDomain,
  (subState) => subState && subState.get('selectedParticipants').toJS()
);


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

const makeSelectCareTeamReferences = () => createSelector(
  selectSearchAppointmentParticipantDomain,
  (subState) => subState && subState.get('careTeams'),
);

export {
  selectSearchAppointmentParticipantDomain,
  makeSelectSearchAppointmentParticipantResults,
  makeSelectSelectedAppointmentParticipants,
  makeSelectHealthcareServiceReferences,
  makeSelectLocationReferences,
  makeSelectPractitionerReferences,
  makeSelectCareTeamReferences,
};
