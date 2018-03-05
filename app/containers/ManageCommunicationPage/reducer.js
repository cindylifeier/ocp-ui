/*
 *
 * ManageCommunicationPage reducer
 *
 */

import { fromJS } from 'immutable';
import {
  SAVE_COMMUNICATION_ERROR,
  GET_EPISODE_OF_CARES_SUCCESS,
} from './constants';

const initialState = fromJS({
  error: false,
  communication: {},
  episodeOfCares: [],
});


function manageCommunicationPageReducer(state = initialState, action) {
  switch (action.type) {
    case SAVE_COMMUNICATION_ERROR:
      return state.set('error', action.error);
    case GET_EPISODE_OF_CARES_SUCCESS:
      return state.set('episodeOfCares', fromJS((action.episodeOfCares) || {}));
    default:
      return state;
  }
}

export default manageCommunicationPageReducer;
