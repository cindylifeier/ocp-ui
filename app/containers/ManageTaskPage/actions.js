/*
 *
 * ManageTaskPage actions
 *
 */

import {
  GET_PATIENT, GET_PATIENT_SUCCESS, GET_ORGANIZATION, GET_ORGANIZATION_SUCCESS,
  GET_ORGANIZATION_ERROR, GET_ACTIVITY_DEFINITIONS, GET_ACTIVITY_DEFINITIONS_SUCCESS, GET_ACTIVITY_DEFINITIONS_ERROR,
  GET_PRACTITIONERS, GET_PRACTITIONERS_ERROR, GET_PRACTITIONERS_SUCCESS,
  CREATE_TASK, CREATE_TASK_SUCCESS, CREATE_TASK_ERROR,
} from './constants';

export function getPatient(patientId) {
  return {
    type: GET_PATIENT,
    patientId,
  };
}

export function getPatientSuccess(patient) {
  return {
    type: GET_PATIENT_SUCCESS,
    patient,
  };
}

export function getOrganization() {
  return {
    type: GET_ORGANIZATION,
  };
}

export function getOrganizationSuccess(organization) {
  return {
    type: GET_ORGANIZATION_SUCCESS,
    organization,
  };
}

export function getOrganizationError(err) {
  return {
    type: GET_ORGANIZATION_ERROR,
    err,
  };
}

export function getActivityDefinitions(organizationId) {
  return {
    type: GET_ACTIVITY_DEFINITIONS,
    organizationId,
  };
}

export function getActivityDefinitionsSuccess(activityDefinitions) {
  return {
    type: GET_ACTIVITY_DEFINITIONS_SUCCESS,
    activityDefinitions,
  };
}

export function getActivityDefinitionsError(err) {
  return {
    type: GET_ACTIVITY_DEFINITIONS_ERROR,
    err,
  };
}

export function getPractitioners() {
  return {
    type: GET_PRACTITIONERS,
  };
}

export function getPractitionersSuccess(practitioners) {
  return {
    type: GET_PRACTITIONERS_SUCCESS,
    practitioners,
  };
}

export function getPractitionersError(err) {
  return {
    type: GET_PRACTITIONERS_ERROR,
    err,
  };
}

export function createTask(taskFormData, handleSubmitting) {
  return {
    type: CREATE_TASK,
    taskFormData,
    handleSubmitting,
  };
}

export function createTaskError(error) {
  return {
    type: CREATE_TASK_ERROR,
    error,
  };
}


export function createTaskSuccess(respone) {
  return {
    type: CREATE_TASK_SUCCESS,
    respone,
  };
}
