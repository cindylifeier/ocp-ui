/*
 *
 * ManageRelatedPersonPage reducer
 *
 */

import { fromJS } from 'immutable';
import {
  SAVE_RELATED_PERSON_ERROR,
} from './constants';

const initialState = fromJS({
  error: false,
  selectedPatient: null,
});

function manageRelatedPersonPageReducer(state = initialState, action) {
  switch (action.type) {
    case SAVE_RELATED_PERSON_ERROR:
      return state
        .set('selectedPatient', action.selectedPatient)
        .set('error', action.error);
    default:
      return state;

  }
}

export default manageRelatedPersonPageReducer;
