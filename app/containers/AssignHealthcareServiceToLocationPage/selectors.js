import { createSelector } from 'reselect';

/**
 * Direct selector to the assignHealthCareServiceToLocationPage state domain
 */
const selectAssignHealthCareServiceToLocationPageDomain = (state) => state.get('assignHealthCareServiceToLocationPage');

/**
 * Other specific selectors
 */


/**
 * Default selector used by AssignHealthCareServiceToLocationPage
 */

const makeSelectAssignHealthCareServiceToLocationPage = () => createSelector(
  selectAssignHealthCareServiceToLocationPageDomain,
  (substate) => substate.toJS()
);

export default makeSelectAssignHealthCareServiceToLocationPage;
export {
  selectAssignHealthCareServiceToLocationPageDomain,
};
