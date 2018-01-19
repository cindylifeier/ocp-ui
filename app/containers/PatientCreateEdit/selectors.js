import { createSelector } from 'reselect';

/**
 * Direct selector to the patientCreateEdit state domain
 */
const selectPatientCreateEditDomain = (state) => state.get('patientCreateEdit');

/**
 * Other specific selectors
 */


/**
 * Default selector used by PatientCreateEdit
 */

const makeSelectPatientCreateEdit = () => createSelector(
  selectPatientCreateEditDomain,
  (substate) => substate.toJS()
);

export default makeSelectPatientCreateEdit;
export {
  selectPatientCreateEditDomain,
};
