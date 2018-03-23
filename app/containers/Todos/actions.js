/*
 *
 * Todos actions
 *
 */
import {
  GET_TODOS, GET_TODOS_ERROR, GET_TODOS_SUCCESS, GET_TODO_MAIN_TASK, GET_TODO_MAIN_TASK_ERROR,
  GET_TODO_MAIN_TASK_SUCCESS,
} from 'containers/Todos/constants';

export function getTodos(patientId, definition) {
  return {
    type: GET_TODOS,
    patientId,
    definition,
  };
}


export function getTodoSuccess(todos) {
  return {
    type: GET_TODOS_SUCCESS,
    todos,
  };
}

export function getTodoError(error) {
  return {
    type: GET_TODOS_ERROR,
    error,
  };
}


export function getTodoMainTask(patientId, definition) {
  return {
    type: GET_TODO_MAIN_TASK,
    patientId,
    definition,
  };
}

export function getTodoMainTaskSuccess(todoMainTask) {
  return {
    type: GET_TODO_MAIN_TASK_SUCCESS,
    todosTaskRefrence: todoMainTask,
  };
}


export function getTodoMainTaskError(error) {
  return {
    type: GET_TODO_MAIN_TASK_ERROR,
    error,
  };
}
