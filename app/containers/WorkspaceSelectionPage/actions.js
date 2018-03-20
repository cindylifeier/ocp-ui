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
  GET_PATIENTS,
  GET_PATIENTS_SUCCESS,
} from './constants';

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

export function getCareManagers() {
  return {
    type: GET_CARE_MANAGERS,
  };
}

export function getCareManagersSuccess(careManagers) {
  return {
    type: GET_CARE_MANAGERS_SUCCESS,
    careManagers,
  };
}

export function getCareCoordinators() {
  return {
    type: GET_CARE_COORDINATORS,
  };
}

export function getCareCoordinatorsSuccess(careCoordinators) {
  return {
    type: GET_CARE_COORDINATORS_SUCCESS,
    careCoordinators,
  };
}

export function getPatients() {
  return {
    type: GET_PATIENTS,
  };
}

export function getPatientsSuccess(patients) {
  return {
    type: GET_PATIENTS_SUCCESS,
    patients,
  };
}
