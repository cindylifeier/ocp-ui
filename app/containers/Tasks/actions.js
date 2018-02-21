/*
 *
 * Tasks actions
 *
 */

import { GET_TASKS, GET_TASKS_SUCCESS, GET_TASKS_ERROR, INITIALIZE_TASKS } from './constants';

export function initializeTasks() {
  return {
    type: INITIALIZE_TASKS,
  };
}

export function getTasks(query, patientName) {
  return {
    type: GET_TASKS,
    query,
    patientName,
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
