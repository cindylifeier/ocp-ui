/*
 *
 * AttestConsentPage actions
 *
 */

import { GET_CONSENT, GET_CONSENT_ERROR, GET_CONSENT_SUCCESS } from './constants';

export function getConsent(logicalId) {
  return {
    type: GET_CONSENT,
    logicalId,
  };
}

export function getConsentSuccess(consent) {
  return {
    type: GET_CONSENT_SUCCESS,
    consent,
  };
}

export function getConsentError(error) {
  return {
    type: GET_CONSENT_ERROR,
    error,
  };
}
