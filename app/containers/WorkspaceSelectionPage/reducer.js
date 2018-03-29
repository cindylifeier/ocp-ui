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
  SEARCH_ORGANIZATION,
  SEARCH_ORGANIZATION_ERROR,
  SEARCH_ORGANIZATION_SUCCESS,
  SEARCH_PATIENT,
  SEARCH_PATIENT_ERROR,
  SEARCH_PATIENT_SUCCESS,
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
  searchOrganization: {
    loading: false,
    result: [],
    currentPage: 0,
    totalNumberOfPages: 0,
  },
  searchPatient: {
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
    case SEARCH_ORGANIZATION:
      return state
        .setIn(['searchOrganization', 'loading'], true);
    case SEARCH_ORGANIZATION_SUCCESS:
      return state
        .setIn(['searchOrganization', 'loading'], false)
        .setIn(['searchOrganization', 'result'], fromJS(action.organizations.elements))
        .setIn(['searchOrganization', 'totalElements'], action.organizations.totalElements)
        .setIn(['searchOrganization', 'currentPageSize'], action.organizations.currentPageSize)
        .setIn(['searchOrganization', 'totalNumberOfPages'], action.organizations.totalNumberOfPages)
        .setIn(['searchOrganization', 'currentPage'], action.organizations.currentPage);
    case SEARCH_ORGANIZATION_ERROR:
      return state
        .setIn(['searchOrganization', 'loading'], false)
        .setIn(['searchOrganization', 'error'], action.error);
    case SEARCH_PATIENT:
      return state
        .setIn(['searchPatient', 'loading'], true);
    case SEARCH_PATIENT_SUCCESS:
      return state
        .setIn(['searchPatient', 'loading'], false)
        .setIn(['searchPatient', 'result'], fromJS(action.patients.elements))
        .setIn(['searchPatient', 'totalElements'], action.patients.totalElements)
        .setIn(['searchPatient', 'currentPageSize'], action.patients.currentPageSize)
        .setIn(['searchPatient', 'totalNumberOfPages'], action.patients.totalNumberOfPages)
        .setIn(['searchPatient', 'currentPage'], action.patients.currentPage);
    case SEARCH_PATIENT_ERROR:
      return state
        .setIn(['searchPatient', 'loading'], false)
        .setIn(['searchPatient', 'error'], action.error);
    default:
      return state;
  }
}

export default workspaceSelectionPageReducer;
