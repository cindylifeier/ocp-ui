import { createSelector } from 'reselect';

/**
 * Direct selector to the manageActivityDefinitionPage state domain
 */
const selectManageActivityDefinitionPageDomain = (state) => state.get('manageActivityDefinitionPage');

/**
 * Other specific selectors
 */


/**
 * Default selector used by ManageActivityDefinitionPage
 */

const makeSelectManageActivityDefinitionPage = () => createSelector(
  selectManageActivityDefinitionPageDomain,
  (substate) => substate.toJS()
);

export default makeSelectManageActivityDefinitionPage;
export {
  selectManageActivityDefinitionPageDomain,
};
