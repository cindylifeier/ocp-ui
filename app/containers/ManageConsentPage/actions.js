/*
 *
 * ManageConsentPage actions
 *
 */

import { CREATE_TASK, CREATE_TASK_ERROR, CREATE_TASK_SUCCESS } from './constants';

export function createConsent(consentFormData, handleSubmitting) {
  return {
    type: CREATE_TASK,
    consentFormData,
    handleSubmitting,
  };
}

export function createConsentError(error) {
  return {
    type: CREATE_TASK_ERROR,
    error,
  };
}


export function createConsentSuccess(response) {
  return {
    type: CREATE_TASK_SUCCESS,
    response,
  };
}

