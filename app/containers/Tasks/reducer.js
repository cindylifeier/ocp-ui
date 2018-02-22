/*
 *
 * Tasks reducer
 *
 */

import { fromJS } from 'immutable';
import {
  GET_TASKS, GET_TASKS_ERROR, GET_TASKS_SUCCESS,
  INITIALIZE_TASKS,
} from './constants';

const initialState = fromJS({
  loading: false,
  patientName: null,
  data: null,
  query: null,
});

function tasksReducer(state = initialState, action) {
  switch (action.type) {
    case INITIALIZE_TASKS:
      return initialState;
    case GET_TASKS:
      return state
        .set('loading', true)
        .set('data', null)
        .set('patientName', action.patientName)
        .set('query', fromJS(action.query));
    case GET_TASKS_SUCCESS:
      return state
        .set('loading', false)
        .set('data', fromJS(action.tasksPage || {}));
    case GET_TASKS_ERROR:
      return state.set('loading', false);
    default:
      return state;
  }
}

export default tasksReducer;
