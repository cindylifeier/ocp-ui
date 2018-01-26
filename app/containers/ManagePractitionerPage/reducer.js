/*
 *
 * ManagePractitionerPage reducer
 *
 */

import { fromJS } from 'immutable';
import { SAVE_PRACTITIONER, SAVE_PRACTITIONER_ERROR } from './constants';

const initialState = fromJS({
  error: false,
});

function managePractitionerPageReducer(state = initialState, action) {
  switch (action.type) {
    case SAVE_PRACTITIONER:
      return state
        .set('error', false);
    case SAVE_PRACTITIONER_ERROR:
      return state
        .set('error', action.error);
    default:
      return state;
  }
}

export default managePractitionerPageReducer;
