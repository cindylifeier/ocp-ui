/*
 *
 * ManageConsentPage actions
 *
 */

import { CREATE_CONSENT, CREATE_CONSENT_ERROR, CREATE_CONSENT_SUCCESS } from './constants';

export function createConsent(consentFormData, handleSubmitting) {
  return {
    type: CREATE_CONSENT,
    consentFormData,
    handleSubmitting,
  };
}

export function createConsentError(error) {
  return {
    type: CREATE_CONSENT_ERROR,
    error,
  };
}


export function createConsentSuccess(response) {
  return {
    type: CREATE_CONSENT_SUCCESS,
    response,
  };
}

