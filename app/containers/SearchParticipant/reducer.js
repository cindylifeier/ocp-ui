/*
 *
 * SearchParticipant reducer
 *
 */

import { fromJS } from 'immutable';
import {
  SEARCH_PARTICIPANT_ERROR,
  SEARCH_PARTICIPANT_SUCCESS,
} from './constants';

const initialState = fromJS({
  searchParticipantResult: [],
});

function searchParticipantReducer(state = initialState, action) {
  switch (action.type) {
    case SEARCH_PARTICIPANT_SUCCESS:
      return state.set('searchParticipantResult', fromJS((action.searchParticipantResults && action.searchParticipantResults.elements) || []));
    case SEARCH_PARTICIPANT_ERROR:
      return state;
    default:
      return state;
  }
}

export default searchParticipantReducer;
