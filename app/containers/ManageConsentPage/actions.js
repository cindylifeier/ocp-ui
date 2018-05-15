/*
 *
 * ManageConsentPage actions
 *
 */

import { SAVE_CONSENT, SAVE_CONSENT_ERROR } from './constants';


export function saveConsent(consentFormData, handleSubmitting) {
  return {
    type: SAVE_CONSENT,
    consentFormData,
    handleSubmitting,
  };
}

export function saveConsentError(error) {
  return {
    type: SAVE_CONSENT_ERROR,
    error,
  };
}
