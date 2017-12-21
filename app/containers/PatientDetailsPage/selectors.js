import { createSelector } from 'reselect';

/**
 * Direct selector to the patientDetailsPage state domain
 */
const selectPatientDetailsPageDomain = (state) => state.get('patientDetailsPage');

/**
 * Other specific selectors
 */


/**
 * Default selector used by PatientDetailsPage
 */

const makeSelectPatientId = () => createSelector(
  selectPatientDetailsPageDomain,
  (substate) => substate.get('patientId')
);

const makeSelectPatient = () => createSelector(
  selectPatientDetailsPageDomain,
  (substate) => substate.get('patient')
);

export {
  selectPatientDetailsPageDomain,
  makeSelectPatientId,
  makeSelectPatient,
};
