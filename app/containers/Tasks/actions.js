/*
 *
 * Tasks actions
 *
 */

import {
  GET_TASKS, GET_TASKS_SUCCESS, GET_TASKS_ERROR, INITIALIZE_TASKS, CANCEL_TASK,
  CANCEL_TASK_SUCCESS, CANCEL_TASK_ERROR,
} from './constants';

export function initializeTasks() {
  return {
    type: INITIALIZE_TASKS,
  };
}

export function getTasks(practitionerId, patientId) {
  return {
    type: GET_TASKS,
    practitionerId,
    patientId,
  };
}

export function getTasksSuccess(tasksPage) {
  return {
    type: GET_TASKS_SUCCESS,
    tasksPage,
  };
}

export function getTasksError(error) {
  return {
    type: GET_TASKS_ERROR,
    error,
  };
}

export function cancelTask(id) {
  return {
    type: CANCEL_TASK,
    id,
  };
}

export function cancelTaskSuccess(id) {
  return {
    type: CANCEL_TASK_SUCCESS,
    id,
  };
}

export function cancelTaskError(error) {
  return {
    type: CANCEL_TASK_ERROR,
    error,
  };
}
