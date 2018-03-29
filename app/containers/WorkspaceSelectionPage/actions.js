/*
 *
 * WorkspaceSelectionPage actions
 *
 */

import {
  GET_CARE_COORDINATORS,
  GET_CARE_COORDINATORS_SUCCESS,
  GET_CARE_MANAGERS,
  GET_CARE_MANAGERS_SUCCESS,
  GET_WORKFLOW_ROLES,
  GET_WORKFLOW_ROLES_SUCCESS,
  SEARCH_ORGANIZATIONS,
  SEARCH_ORGANIZATIONS_ERROR,
  SEARCH_ORGANIZATIONS_SUCCESS,
  SEARCH_PATIENTS,
  SEARCH_PATIENTS_ERROR,
  SEARCH_PATIENTS_SUCCESS,
} from './constants';

export function getWorkflowRoles() {
  return {
    type: GET_WORKFLOW_ROLES,
  };
}

export function getWorkflowRolesSuccess(workflowRoles) {
  return {
    type: GET_WORKFLOW_ROLES_SUCCESS,
    workflowRoles,
  };
}

export function searchOrganizations(searchValue, showInactive, searchType, currentPage) {
  return {
    type: SEARCH_ORGANIZATIONS,
    searchValue,
    showInactive,
    searchType,
    currentPage,
  };
}

export function searchOrganizationsSuccess(organizations) {
  return {
    type: SEARCH_ORGANIZATIONS_SUCCESS,
    organizations,
  };
}

export function searchOrganizationsError(error) {
  return {
    type: SEARCH_ORGANIZATIONS_ERROR,
    error,
  };
}

export function getCareManagers(role, organization) {
  return {
    type: GET_CARE_MANAGERS,
    role,
    organization,
  };
}

export function getCareManagersSuccess(careManagers) {
  return {
    type: GET_CARE_MANAGERS_SUCCESS,
    careManagers,
  };
}

export function getCareCoordinators(role, organization) {
  return {
    type: GET_CARE_COORDINATORS,
    role,
    organization,
  };
}

export function getCareCoordinatorsSuccess(careCoordinators) {
  return {
    type: GET_CARE_COORDINATORS_SUCCESS,
    careCoordinators,
  };
}

export function searchPatients(searchValue, showInactive, searchType, currentPage) {
  return {
    type: SEARCH_PATIENTS,
    searchValue,
    showInactive,
    searchType,
    currentPage,
  };
}

export function searchPatientSuccess(patients) {
  return {
    type: SEARCH_PATIENTS_SUCCESS,
    patients,
  };
}

export function searchPatientError(error) {
  return {
    type: SEARCH_PATIENTS_ERROR,
    error,
  };
}
