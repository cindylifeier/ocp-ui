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
  GET_ORGANIZATIONS,
  GET_ORGANIZATIONS_SUCCESS,
  GET_WORKFLOW_ROLES,
  GET_WORKFLOW_ROLES_SUCCESS,
  SEARCH_PATIENT,
  SEARCH_PATIENT_SUCCESS,
  SEARCH_PATIENT_ERROR,
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

export function getOrganizations() {
  return {
    type: GET_ORGANIZATIONS,
  };
}

export function getOrganizationsSuccess(organizations) {
  return {
    type: GET_ORGANIZATIONS_SUCCESS,
    organizations,
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

export function searchPatient(searchType, searchValue, includeInactive, currentPage) {
  return {
    type: SEARCH_PATIENT,
    searchType,
    searchValue,
    includeInactive,
    currentPage,
  };
}

export function searchPatientSuccess(patients) {
  return {
    type: SEARCH_PATIENT_SUCCESS,
    patients,
  };
}

export function searchPatientError(error) {
  return {
    type: SEARCH_PATIENT_ERROR,
    error,
  };
}
