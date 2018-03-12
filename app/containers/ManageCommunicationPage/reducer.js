/*
 *
 * ManageCommunicationPage reducer
 *
 */

import { fromJS } from 'immutable';
import {
  SAVE_COMMUNICATION_ERROR,
  GET_EPISODE_OF_CARES_SUCCESS,
  GET_PRACTITIONER_SUCCESS,
  GET_COMMUNICATION_SUCCESS,
} from './constants';

const initialState = fromJS({
  error: false,
  communication: {},
  practitioner: {},
  episodeOfCares: [],
});


function manageCommunicationPageReducer(state = initialState, action) {
  switch (action.type) {
    case SAVE_COMMUNICATION_ERROR:
      return state.set('error', action.error);
    case GET_EPISODE_OF_CARES_SUCCESS:
      return state.set('episodeOfCares', fromJS((action.episodeOfCares) || {}));
    case GET_PRACTITIONER_SUCCESS:
      return state.setIn(['practitioner'], fromJS((action.practitioner) || {}));
    case GET_COMMUNICATION_SUCCESS:
      return state.setIn(['communication'], fromJS((action.communication) || {}));
    default:
      return state;
  }
}

export default manageCommunicationPageReducer;
