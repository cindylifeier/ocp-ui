/*
 *
 * AssignLocationToPractitionerPage actions
 *
 */

import {
  GET_PRACTIONER_LOCATION_ASSIGNMENT,
  GET_PRACTIONER_LOCATION_ASSIGNMENT_SUCCESS,
  GET_PRACTIONER_LOCATION_ASSIGNMENT_ERROR,
  INITIALIZE_ASSIGN_LOCATION_TO_PRACTITIONER,
} from './constants';


export function initializeAssignLocationToPractitionerPage() {
  return {
    type: INITIALIZE_ASSIGN_LOCATION_TO_PRACTITIONER,
  };
}

export function getPractitionerLocationAssignment(currentPage) {
  return {
    type: GET_PRACTIONER_LOCATION_ASSIGNMENT,
    currentPage,
  };
}

export function getPractitionerLocationAssignmentSuccess(practitionerLocations) {
  return {
    type: GET_PRACTIONER_LOCATION_ASSIGNMENT_SUCCESS,
    practitionerLocations,
  };
}

export function getPractitionerLocationAssignmentError(error) {
  return {
    type: GET_PRACTIONER_LOCATION_ASSIGNMENT_ERROR,
    error,
  };
}
