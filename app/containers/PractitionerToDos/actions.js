/*
 *
 * PractitionerToDos actions
 *
 */

import {
  GET_PRACTITIONER_TO_DOS, GET_PRACTITIONER_TO_DOS_ERROR,
  GET_PRACTITIONER_TO_DOS_SUCCESS,
} from 'containers/PractitionerToDos/constants';

export function getPractitionerToDos(practitionerId, definition) {
  return {
    type: GET_PRACTITIONER_TO_DOS,
    practitionerId,
    definition,
  };
}


export function getPractitionerToDoSuccess(toDos) {
  return {
    type: GET_PRACTITIONER_TO_DOS_SUCCESS,
    toDos,
  };
}

export function getPractitionerToDoError(error) {
  return {
    type: GET_PRACTITIONER_TO_DOS_ERROR,
    error,
  };
}
