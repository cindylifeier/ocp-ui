/*
 *
 * ManageTaskPage actions
 *
 */

import {
  CREATE_TASK,
  CREATE_TASK_ERROR,
  CREATE_TASK_SUCCESS,
  GET_ACTIVITY_DEFINITIONS,
  GET_ACTIVITY_DEFINITIONS_ERROR,
  GET_ACTIVITY_DEFINITIONS_SUCCESS,
  GET_ORGANIZATION,
  GET_ORGANIZATION_ERROR,
  GET_ORGANIZATION_SUCCESS,
  GET_PRACTITIONERS,
  GET_PRACTITIONERS_ERROR,
  GET_PRACTITIONERS_SUCCESS,
  GET_EVENT_TYPES,
  GET_EVENT_TYPES_ERROR,
  GET_EVENT_TYPES_SUCCESS,
  PUT_TASK,
  PUT_TASK_ERROR,
  PUT_TASK_SUCCESS,
  GET_TASK,
  GET_TASK_ERROR,
  GET_TASK_SUCCESS,
} from './constants';


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

export function getEventTypes(patientId) {
  return {
    type: GET_EVENT_TYPES,
    patientId,
  };
}

export function getEventTypesSuccess(patient) {
  return {
    type: GET_EVENT_TYPES_SUCCESS,
    patient,
  };
}

export function getEventTypesError(err) {
  return {
    type: GET_EVENT_TYPES_ERROR,
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


export function createTaskSuccess(response) {
  return {
    type: CREATE_TASK_SUCCESS,
    response,
  };
}


export function updateTask(taskFormData, handleSubmitting) {
  return {
    type: PUT_TASK,
    taskFormData,
    handleSubmitting,
  };
}

export function updateTaskError(error) {
  return {
    type: PUT_TASK_ERROR,
    error,
  };
}


export function updateTaskSuccess(response) {
  return {
    type: PUT_TASK_SUCCESS,
    response,
  };
}

export function getTaskById(logicalId) {
  return {
    type: GET_TASK,
    logicalId,
  };
}

export function getTaskByIdError(error) {
  return {
    type: GET_TASK_ERROR,
    error,
  };
}


export function getTaskByIdSuccess(response) {
  return {
    type: GET_TASK_SUCCESS,
    response,
  };
}
