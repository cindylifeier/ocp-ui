import { createSelector } from 'reselect';

/**
 * Direct selector to the practitionerToDos state domain
 */
const selectPractitionerToDosDomain = (state) => state.get('practitionerToDos');

/**
 * Other specific selectors
 */


/**
 * Default selector used by PractitionerToDos
 */

const makeSelectPractitionerToDos = () => createSelector(
  selectPractitionerToDosDomain,
  (substate) => substate.toJS()
);

export default makeSelectPractitionerToDos;
export {
  selectPractitionerToDosDomain,
};
