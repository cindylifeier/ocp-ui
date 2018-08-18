/*
 *
 * NewPractitionerResource actions
 *
 */

import {
  FIND_PRACTITIONER,
  FIND_PRACTITIONER_ERROR,
  FIND_PRACTITIONER_SUCCESS,
  INITIALIZE_FIND_PRACTITIONER,
} from './constants';


export function initializeFindPractitioner() {
  return {
    type: INITIALIZE_FIND_PRACTITIONER,
  };
}

export function findPractitioner(firstName, lastName, identifierType, identifier, handleSubmitting) {
  return {
    type: FIND_PRACTITIONER,
    firstName,
    lastName,
    identifierType,
    identifier,
    handleSubmitting,
  };
}

export function findPractitionerSuccess(practitioner, firstName, lastName, identifierType, identifier) {
  return {
    type: FIND_PRACTITIONER_SUCCESS,
    practitioner,
    queryParameters: { firstName, lastName, identifierType, identifier },
  };
}

export function findPractitionerError(error) {
  return {
    type: FIND_PRACTITIONER_ERROR,
    error,
  };
}
