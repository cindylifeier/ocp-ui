import { createSelector } from 'reselect';

/**
 * Direct selector to the patientPage state domain
 */
const selectPatientPageDomain = (state) => state.get('patientPage');

/**
 * Other specific selectors
 */


/**
 * Default selector used by PatientPage
 */

const makeSelectPatientPage = () => createSelector(
  selectPatientPageDomain,
  (substate) => substate.toJS()
);

export default makeSelectPatientPage;
export {
  selectPatientPageDomain,
};
