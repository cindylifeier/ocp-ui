/*
 *
 * WorkspaceSelectionPage reducer
 *
 */

import { fromJS } from 'immutable';
import {
  GET_CARE_COORDINATORS_SUCCESS,
  GET_CARE_MANAGERS_SUCCESS,
  GET_WORKFLOW_ROLES_SUCCESS,
  SEARCH_ORGANIZATIONS,
  SEARCH_ORGANIZATIONS_ERROR,
  SEARCH_ORGANIZATIONS_SUCCESS,
  SEARCH_PATIENTS,
  SEARCH_PATIENTS_ERROR,
  SEARCH_PATIENTS_SUCCESS,
} from 'containers/WorkspaceSelectionPage/constants';

const initialState = fromJS({
  workflowRoles: {
    data: [],
  },
  careManagers: {
    data: [],
  },
  careCoordinators: {
    data: [],
  },
  searchOrganizations: {
    loading: false,
    result: [],
    currentPage: 0,
    totalNumberOfPages: 0,
  },
  searchPatients: {
    loading: false,
    result: [],
    currentPage: 0,
    totalNumberOfPages: 0,
  },
});

function workspaceSelectionPageReducer(state = initialState, action) {
  switch (action.type) {
    case GET_WORKFLOW_ROLES_SUCCESS:
      return state
        .setIn(['workflowRoles', 'data'], fromJS(action.workflowRoles));
    case GET_CARE_MANAGERS_SUCCESS:
      return state
        .setIn(['careManagers', 'data'], fromJS(action.careManagers.elements));
    case GET_CARE_COORDINATORS_SUCCESS:
      return state
        .setIn(['careCoordinators', 'data'], fromJS(action.careCoordinators.elements));
    case SEARCH_ORGANIZATIONS:
      return state
        .setIn(['searchOrganizations', 'loading'], true);
    case SEARCH_ORGANIZATIONS_SUCCESS:
      return state
        .setIn(['searchOrganizations', 'loading'], false)
        .setIn(['searchOrganizations', 'result'], fromJS(action.organizations.elements))
        .setIn(['searchOrganizations', 'totalElements'], action.organizations.totalElements)
        .setIn(['searchOrganizations', 'currentPageSize'], action.organizations.currentPageSize)
        .setIn(['searchOrganizations', 'totalNumberOfPages'], action.organizations.totalNumberOfPages)
        .setIn(['searchOrganizations', 'currentPage'], action.organizations.currentPage);
    case SEARCH_ORGANIZATIONS_ERROR:
      return state
        .setIn(['searchOrganizations', 'loading'], false)
        .setIn(['searchOrganizations', 'error'], action.error);
    case SEARCH_PATIENTS:
      return state
        .setIn(['searchPatients', 'loading'], true);
    case SEARCH_PATIENTS_SUCCESS:
      return state
        .setIn(['searchPatients', 'loading'], false)
        .setIn(['searchPatients', 'result'], fromJS(action.patients.elements))
        .setIn(['searchPatients', 'totalElements'], action.patients.totalElements)
        .setIn(['searchPatients', 'currentPageSize'], action.patients.currentPageSize)
        .setIn(['searchPatients', 'totalNumberOfPages'], action.patients.totalNumberOfPages)
        .setIn(['searchPatients', 'currentPage'], action.patients.currentPage);
    case SEARCH_PATIENTS_ERROR:
      return state
        .setIn(['searchPatients', 'loading'], false)
        .setIn(['searchPatients', 'error'], action.error);
    default:
      return state;
  }
}

export default workspaceSelectionPageReducer;
