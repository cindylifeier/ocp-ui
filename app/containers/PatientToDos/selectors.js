import { createSelector } from 'reselect';

/**
 * Direct selector to the patientToDos state domain
 */
const selectPatientToDosDomain = (state) => state.get('patientToDos');

/**
 * Other specific selectors
 */


/**
 * Default selector used by PatientToDos
 */

const makeSelectPatientToDos = () => createSelector(
  selectPatientToDosDomain,
  (substate) => substate.toJS()
);

export default makeSelectPatientToDos;
export {
  selectPatientToDosDomain,
};
