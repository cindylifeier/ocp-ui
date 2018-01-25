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

const makeSelectSaveLocationError = () => createSelector(
  selectManageLocationPageDomain,
  (substate) => substate.get('error'),
);

export default makeSelectManageLocationPage;
export {
  selectManageLocationPageDomain,
  makeSelectSaveLocationError,
};
