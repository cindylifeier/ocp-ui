import { createSelector } from 'reselect';

/**
 * Direct selector to the manageAppointmentPage state domain
 */
const selectManageAppointmentPageDomain = (state) => state.get('manageAppointmentPage');

/**
 * Other specific selectors
 */


const makeSelectAppointment = () => createSelector(
  selectManageAppointmentPageDomain,
  (subState) => subState && subState.get('appointment'),
);

const makeSelectHealthcareServiceReferences = () => createSelector(
  selectManageAppointmentPageDomain,
  (subState) => subState && subState.get('healthcareServices'),
);

const makeSelectLocationReferences = () => createSelector(
  selectManageAppointmentPageDomain,
  (subState) => subState && subState.get('locations'),
);

const makeSelectPractitionerReferences = () => createSelector(
  selectManageAppointmentPageDomain,
  (subState) => subState && subState.get('practitioners'),
);

const makeSelectCareTeamReferences = () => createSelector(
  selectManageAppointmentPageDomain,
  (subState) => subState && subState.get('careTeams'),
);


const makeSelectParticipants = () => createSelector(
  selectManageAppointmentPageDomain,
  (subState) => subState && subState.get('selectedParticipants'),
);

export {
  selectManageAppointmentPageDomain,
  makeSelectAppointment,
  makeSelectHealthcareServiceReferences,
  makeSelectLocationReferences,
  makeSelectPractitionerReferences,
  makeSelectCareTeamReferences,
  makeSelectParticipants,
};
