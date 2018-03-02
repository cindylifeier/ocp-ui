/*
 *
 * ManageCommunicationPage reducer
 *
 */

import { fromJS } from 'immutable';
import {
  SAVE_COMMUNICATION_ERROR,
} from './constants';


const initialState = fromJS({
  error: false,
  communication: {},
});


function manageCommunicationPageReducer(state = initialState, action) {
  switch (action.type) {
    case SAVE_COMMUNICATION_ERROR:
      return state.set('error', action.error);
    default:
      return state;
  }
}

export default manageCommunicationPageReducer;
