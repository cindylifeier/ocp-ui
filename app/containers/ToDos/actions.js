/*
 *
 * Todos actions
 *
 */
import {
  GET_TO_DOS, GET_TO_DOS_ERROR, GET_TO_DOS_SUCCESS, GET_TO_DO_MAIN_TASK, GET_TO_DO_MAIN_TASK_ERROR,
  GET_TO_DO_MAIN_TASK_SUCCESS,
} from 'containers/ToDos/constants';

export function getToDos(patientId, practitionerId, definition) {
  return {
    type: GET_TO_DOS,
    patientId,
    practitionerId,
    definition,
  };
}


export function getToDoSuccess(toDos) {
  return {
    type: GET_TO_DOS_SUCCESS,
    toDos,
  };
}

export function getToDoError(error) {
  return {
    type: GET_TO_DOS_ERROR,
    error,
  };
}


export function getToDoMainTask(patientId, definition) {
  return {
    type: GET_TO_DO_MAIN_TASK,
    patientId,
    definition,
  };
}

export function getToDoMainTaskSuccess(todoMainTask) {
  return {
    type: GET_TO_DO_MAIN_TASK_SUCCESS,
    todoMainTask,
  };
}


export function getToDoMainTaskError(error) {
  return {
    type: GET_TO_DO_MAIN_TASK_ERROR,
    error,
  };
}
