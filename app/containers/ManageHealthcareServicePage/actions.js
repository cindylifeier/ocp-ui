/*
 *
 * ManageHealthcareServicePage actions
 *
 */

import {
  POST_HEALTHCARE_SERVICE, POST_HEALTHCARE_SERVICE_ERROR, POST_HEALTHCARE_SERVICE_SUCCESS,
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
