/*
 *
 * Tasks reducer
 *
 */

import { fromJS } from 'immutable';
import find from 'lodash/find';
import {
  CANCEL_TASK_SUCCESS,
  GET_TASKS,
  GET_TASKS_ERROR,
  GET_TASKS_SUCCESS,
  INITIALIZE_TASKS,
  GET_TASK_RELATED_COMMUNICATIONS,
  GET_TASK_RELATED_COMMUNICATIONS_SUCCESS,
  GET_TASK_RELATED_COMMUNICATIONS_ERROR,
} from './constants';

const initialState = fromJS({
  loading: false,
  data: {},
  statusList: [],
  communicationLoading: false,
  communicationError: false,
  communications: null,
});

function tasksReducer(state = initialState, action) {
  switch (action.type) {
    case INITIALIZE_TASKS:
      return initialState;
    case GET_TASKS:
      return state
        .set('loading', true)
        .set('practitionerId', action.practitionerId)
        .set('patientId', action.patientId)
        .set('statusList', fromJS(action.statusList))
        .set('data', fromJS({}));
    case GET_TASKS_SUCCESS:
      return state
        .set('loading', false)
        .set('data', fromJS(action.tasksPage || {}));
    case GET_TASKS_ERROR:
      return state
        .set('loading', false)
        .set('error', action.error);
    case CANCEL_TASK_SUCCESS: {
      const data = state.get('data').toJS();
      find(data.elements, { logicalId: action.id }).status = { code: 'cancelled', display: 'Cancelled' };
      return state.set('data', fromJS(data));
    }
    case GET_TASK_RELATED_COMMUNICATIONS:
      return state.set('communicationLoading', true);
    case GET_TASK_RELATED_COMMUNICATIONS_SUCCESS:
      return state
        .set('communicationError', false)
        .set('communicationLoading', false)
        .set('communications', fromJS((action.communications) || {}));
    case GET_TASK_RELATED_COMMUNICATIONS_ERROR:
      return state
        .set('communicationError', action.error)
        .set('communicationLoading', false);
    default:
      return state;
  }
}

export default tasksReducer;
