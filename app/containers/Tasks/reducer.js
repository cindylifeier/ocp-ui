/*
 *
 * Tasks reducer
 *
 */

import { fromJS } from 'immutable';
import find from 'lodash/find';
import {
  CANCEL_TASK_SUCCESS,
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
    case CANCEL_TASK_SUCCESS: {
      const data = state.get('data').toJS();
      find(data.elements, { logicalId: action.id }).status = { code: 'cancelled', display: 'Cancelled' };
      return state.set('data', fromJS(data));
    }
    default:
      return state;
  }
}

export default tasksReducer;