/*
 *
 * Todos actions
 *
 */
import { GET_TODOS, GET_TODOS_ERROR, GET_TODOS_SUCCESS } from 'containers/Todos/constants';

export function getTodos(patientId, definition, pageNumber) {
  return {
    type: GET_TODOS,
    patientId,
    definition,
    pageNumber,
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
