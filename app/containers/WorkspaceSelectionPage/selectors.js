import { createSelector } from 'reselect';

/**
 * Direct selector to the workspaceSelectionPage state domain
 */
const selectWorkspaceSelectionPageDomain = (state) => state.get('workspaceSelectionPage');

/**
 * Other specific selectors
 */
const makeSelectWorkflowRolesData = () => createSelector(
  selectWorkspaceSelectionPageDomain,
  (substate) => substate && substate.getIn(['workflowRoles', 'data']).toJS(),
);

const makeSelectOrganizationsData = () => createSelector(
  selectWorkspaceSelectionPageDomain,
  (substate) => substate && substate.get('searchOrganizations').toJS(),
);

const makeCareManagersData = () => createSelector(
  selectWorkspaceSelectionPageDomain,
  (substate) => substate && substate.getIn(['careManagers', 'data']).toJS(),
);

const makeCareCoordinatorsData = () => createSelector(
  selectWorkspaceSelectionPageDomain,
  (substate) => substate && substate.getIn(['careCoordinators', 'data']).toJS(),
);

const makeSelectPatientsData = () => createSelector(
  selectWorkspaceSelectionPageDomain,
  (substate) => substate && substate.get('searchPatients').toJS(),
);

/**
 * Default selector used by WorkspaceSelectionPage
 */

const makeSelectWorkspaceSelectionPage = () => createSelector(
  selectWorkspaceSelectionPageDomain,
  (substate) => substate.toJS(),
);

export default makeSelectWorkspaceSelectionPage;
export {
  selectWorkspaceSelectionPageDomain,
  makeSelectWorkflowRolesData,
  makeSelectOrganizationsData,
  makeCareManagersData,
  makeCareCoordinatorsData,
  makeSelectPatientsData,
};
