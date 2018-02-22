/*
 *
 * ManageHealthcareServicePage actions
 *
 */

import {
  GET_HEALTHCARE_SERVICE, GET_HEALTHCARE_SERVICE_ERROR, GET_HEALTHCARE_SERVICE_SUCCESS,
  CREATE_HEALTHCARE_SERVICE, CREATE_HEALTHCARE_SERVICE_ERROR, CREATE_HEALTHCARE_SERVICE_SUCCESS, UPDATE_HEALTHCARE_SERVICE,
  UPDATE_HEALTHCARE_SERVICE_ERROR, UPDATE_HEALTHCARE_SERVICE_SUCCESS,
} from './constants';


export function createHealthcareService(healthcareServiceFormData, handleSubmitting) {
  return {
    type: CREATE_HEALTHCARE_SERVICE,
    healthcareServiceFormData,
    handleSubmitting,
  };
}

export function createHealthcareServiceError(error) {
  return {
    type: CREATE_HEALTHCARE_SERVICE_ERROR,
    error,
  };
}


export function createHealthcareServiceSuccess(response) {
  return {
    type: CREATE_HEALTHCARE_SERVICE_SUCCESS,
    response,
  };
}

export function editHealthcareService(healthcareServiceFormData, handleSubmitting) {
  return {
    type: UPDATE_HEALTHCARE_SERVICE,
    healthcareServiceFormData,
    handleSubmitting,
  };
}

export function editHealthcareServiceError(error) {
  return {
    type: UPDATE_HEALTHCARE_SERVICE_ERROR,
    error,
  };
}


export function editHealthcareServiceSuccess(response) {
  return {
    type: UPDATE_HEALTHCARE_SERVICE_SUCCESS,
    response,
  };
}

export function getHealthcareServiceById(logicalId) {
  return {
    type: GET_HEALTHCARE_SERVICE,
    logicalId,
  };
}

export function getHealthcareServiceByIdError(error) {
  return {
    type: GET_HEALTHCARE_SERVICE_ERROR,
    error,
  };
}


export function getHealthcareServiceByIdSuccess(response) {
  return {
    type: GET_HEALTHCARE_SERVICE_SUCCESS,
    response,
  };
}
