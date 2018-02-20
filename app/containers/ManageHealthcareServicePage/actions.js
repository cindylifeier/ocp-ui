/*
 *
 * ManageHealthcareServicePage actions
 *
 */

import {
  GET_HEALTHCARE_SERVICE, GET_HEALTHCARE_SERVICE_ERROR, GET_HEALTHCARE_SERVICE_SUCCESS,
  POST_HEALTHCARE_SERVICE, POST_HEALTHCARE_SERVICE_ERROR, POST_HEALTHCARE_SERVICE_SUCCESS, PUT_HEALTHCARE_SERVICE,
  PUT_HEALTHCARE_SERVICE_ERROR, PUT_HEALTHCARE_SERVICE_SUCCESS,
} from './constants';


export function createHealthcareService(healthcareServiceFormData, handleSubmitting) {
  return {
    type: POST_HEALTHCARE_SERVICE,
    healthcareServiceFormData,
    handleSubmitting,
  };
}

export function createHealthcareServiceError(error) {
  return {
    type: POST_HEALTHCARE_SERVICE_ERROR,
    error,
  };
}


export function createHealthcareServiceSuccess(respone) {
  return {
    type: POST_HEALTHCARE_SERVICE_SUCCESS,
    respone,
  };
}

export function editHealthcareService(healthcareServiceFormData, handleSubmitting) {
  return {
    type: PUT_HEALTHCARE_SERVICE,
    healthcareServiceFormData,
    handleSubmitting,
  };
}

export function editHealthcareServiceError(error) {
  return {
    type: PUT_HEALTHCARE_SERVICE_ERROR,
    error,
  };
}


export function editHealthcareServiceSuccess(respone) {
  return {
    type: PUT_HEALTHCARE_SERVICE_SUCCESS,
    respone,
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


export function getHealthcareServiceByIdSuccess(respone) {
  return {
    type: GET_HEALTHCARE_SERVICE_SUCCESS,
    respone,
  };
}
