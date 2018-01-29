/*
 *
 * ManagePractitionerPage reducer
 *
 */

import { fromJS } from 'immutable';
import {
  GET_PRACTITIONER_ERROR,
  GET_PRACTITIONER_SUCCESS,
  SAVE_PRACTITIONER,
  SAVE_PRACTITIONER_ERROR,
} from './constants';

const initialState = fromJS({
  error: false,
  practitioner: null,
});

function managePractitionerPageReducer(state = initialState, action) {
  switch (action.type) {
    case SAVE_PRACTITIONER:
      return state
        .set('error', false);
    case SAVE_PRACTITIONER_ERROR:
      return state
        .set('error', action.error);
    case GET_PRACTITIONER_SUCCESS:
      return state
        .set('practitioner', action.practitioner);
    case GET_PRACTITIONER_ERROR:
      return state
        .set('error', action.error);
    default:
      return state;
  }
}

export default managePractitionerPageReducer;
