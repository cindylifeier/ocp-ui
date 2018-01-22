import { createSelector } from 'reselect';

/**
 * Direct selector to the manageLocationPage state domain
 */
const selectManageLocationPageDomain = (state) => state.get('manageLocationPage');

/**
 * Other specific selectors
 */


/**
 * Default selector used by ManageLocationPage
 */

const makeSelectManageLocationPage = () => createSelector(
  selectManageLocationPageDomain,
  (substate) => substate.toJS()
);

export default makeSelectManageLocationPage;
export {
  selectManageLocationPageDomain,
};
