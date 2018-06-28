import { createSelector } from 'reselect';

/**
 * Direct selector to the permissionAssignments state domain
 */
const selectPermissionAssignmentsDomain = (state) => state.get('permissionAssignments');

/**
 * Other specific selectors
 */


/**
 * Default selector used by PermissionAssignments
 */

const makeSelectPermissionAssignments = () => createSelector(
  selectPermissionAssignmentsDomain,
  (substate) => substate.toJS()
);

const makeSelectUsers = () => createSelector(
  selectPermissionAssignmentsDomain,
  (substate) => substate.get('users'),
);

export default makeSelectPermissionAssignments;
export {
  selectPermissionAssignmentsDomain,
  makeSelectUsers,
};
