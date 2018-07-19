import { createSelector } from 'reselect';

/**
 * Direct selector to the assignLocationToPractitionerPage state domain
 */
const selectAssignLocationToPractitionerPageDomain = (state) => state.get('assignLocationToPractitionerPage');

/**
 * Other specific selectors
 */


/**
 * Default selector used by AssignLocationToPractitionerPage
 */

const makeSelectAssignLocationToPractitionerPage = () => createSelector(
  selectAssignLocationToPractitionerPageDomain,
  (substate) => substate.toJS()
);

export default makeSelectAssignLocationToPractitionerPage;
export {
  selectAssignLocationToPractitionerPageDomain,
};
