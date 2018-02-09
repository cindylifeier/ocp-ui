/*
 *
 * ManageHealthcareServicePage actions
 *
 */

import {
  POST_HEALTHCARE_SERVICE, CREATE_HEALTHCARE_SERVICE_ERROR, CREATE_HEALTHCARE_SERVICE_SUCCESS,
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
    type: CREATE_HEALTHCARE_SERVICE_ERROR,
    error,
  };
}


export function createHealthcareServiceSuccess(respone) {
  return {
    type: CREATE_HEALTHCARE_SERVICE_SUCCESS,
    respone,
  };
}
