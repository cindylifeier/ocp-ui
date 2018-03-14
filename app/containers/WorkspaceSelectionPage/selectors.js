import { createSelector } from 'reselect';

/**
 * Direct selector to the workspaceSelectionPage state domain
 */
const selectWorkspaceSelectionPageDomain = (state) => state.get('workspaceSelectionPage');

/**
 * Other specific selectors
 */


/**
 * Default selector used by WorkspaceSelectionPage
 */

const makeSelectWorkspaceSelectionPage = () => createSelector(
  selectWorkspaceSelectionPageDomain,
  (substate) => substate.toJS()
);

export default makeSelectWorkspaceSelectionPage;
export {
  selectWorkspaceSelectionPageDomain,
};
