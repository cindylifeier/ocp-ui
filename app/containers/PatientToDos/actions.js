/*
 *
 * PatientToDos actions
 *
 */

import {
  GET_PATIENT_TO_DOS, GET_PATIENT_TO_DOS_ERROR, GET_PATIENT_TO_DOS_SUCCESS, GET_PATIENT_TO_DO_MAIN_TASK,
  GET_PATIENT_TO_DO_MAIN_TASK_ERROR,
  GET_PATIENT_TO_DO_MAIN_TASK_SUCCESS, CANCEL_TO_DO_SUCCESS, CANCEL_TO_DO, CANCEL_TO_DO_ERROR,
} from 'containers/PatientToDos/constants';

export function getPatientToDos(patientId, practitionerId, definition) {
  return {
    type: GET_PATIENT_TO_DOS,
    patientId,
    practitionerId,
    definition,
  };
}


export function getPatientToDoSuccess(toDos) {
  return {
    type: GET_PATIENT_TO_DOS_SUCCESS,
    toDos,
  };
}

export function getPatientToDoError(error) {
  return {
    type: GET_PATIENT_TO_DOS_ERROR,
    error,
  };
}


export function getPatientToDoMainTask(patientId, organizationId, definition, practitionerId) {
  return {
    type: GET_PATIENT_TO_DO_MAIN_TASK,
    patientId,
    organizationId,
    definition,
    practitionerId,
  };
}

export function getPatientToDoMainTaskSuccess(toDoMainTask) {
  return {
    type: GET_PATIENT_TO_DO_MAIN_TASK_SUCCESS,
    toDoMainTask,
  };
}


export function getPatientToDoMainTaskError(error) {
  return {
    type: GET_PATIENT_TO_DO_MAIN_TASK_ERROR,
    error,
  };
}
export function cancelToDos(toDoLogicalId) {
  return {
    type: CANCEL_TO_DO,
    toDoLogicalId,
  };
}

export function cancelToDoSuccess(toDos) {
  return {
    type: CANCEL_TO_DO_SUCCESS,
    toDos,
  };
}

export function cancelToDosError(error) {
  return {
    type: CANCEL_TO_DO_ERROR,
    error,
  };
}
