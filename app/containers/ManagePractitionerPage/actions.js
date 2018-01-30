/*
 *
 * ManagePractitionerPage actions
 *
 */

import {
  GET_PRACTITIONER,
  GET_PRACTITIONER_ERROR,
  GET_PRACTITIONER_SUCCESS,
  INITIALIZE_MANAGE_PRACTITIONER,
  SAVE_PRACTITIONER,
  SAVE_PRACTITIONER_ERROR,
} from './constants';

export function initializeManagePractitioner() {
  return {
    type: INITIALIZE_MANAGE_PRACTITIONER,
  };
}

export function savePractitioner(practitionerFormData, handleSubmitting) {
  return {
    type: SAVE_PRACTITIONER,
    practitionerFormData,
    handleSubmitting,
  };
}

export function savePractitionerError(error) {
  return {
    type: SAVE_PRACTITIONER_ERROR,
    error,
  };
}

export function getPractitioner(logicalId) {
  return {
    type: GET_PRACTITIONER,
    logicalId,
  };
}

export function getPractitionerSuccess(practitioner) {
  return {
    type: GET_PRACTITIONER_SUCCESS,
    practitioner,
  };
}

export function getPractitionerError(error) {
  return {
    type: GET_PRACTITIONER_ERROR,
    error,
  };
}

