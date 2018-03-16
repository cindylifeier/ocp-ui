/*
 *
 * Todos reducer
 *
 */

import { fromJS } from 'immutable';
import { GET_TODOS, GET_TODOS_ERROR, GET_TODOS_SUCCESS } from 'containers/Todos/constants';

const initialState = fromJS({
  data: {},
  loading: false,
});

function todosReducer(state = initialState, action) {
  switch (action.type) {
    case GET_TODOS:
      return state.set('loading', true);
    case GET_TODOS_SUCCESS:
      return state
        .set('error', false)
        .set('loading', false)
        .set('data', fromJS((action.todos) || {}));
    case GET_TODOS_ERROR:
      return state
        .set('error', true)
        .set('loading', false);
    default:
      return state;
  }
}

export default todosReducer;
