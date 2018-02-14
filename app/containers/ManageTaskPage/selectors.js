import { createSelector } from 'reselect';

/**
 * Direct selector to the manageTaskPage state domain
 */
const selectManageTaskPageDomain = (state) => state.get('manageTaskPage');

/**
 * Other specific selectors
 */


/**
 * Default selector used by ManageTaskPage
 */

const makeSelectManageTaskPage = () => createSelector(
  selectManageTaskPageDomain,
  (substate) => substate.toJS()
);

export default makeSelectManageTaskPage;
export {
  selectManageTaskPageDomain,
};
