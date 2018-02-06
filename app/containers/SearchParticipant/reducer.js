/*
 *
 * SearchParticipant reducer
 *
 */

import { fromJS } from 'immutable';
import {
  ADD_PARTICIPANT,
  SEARCH_PARTICIPANT_ERROR,
  SEARCH_PARTICIPANT_SUCCESS,
} from './constants';

const initialState = fromJS({
  searchParticipantResult: [],
  selectedParticipants: [],
});

function searchParticipantReducer(state = initialState, action) {
  switch (action.type) {
    case SEARCH_PARTICIPANT_SUCCESS:
      return state.set('searchParticipantResult', fromJS((action.searchParticipantResults && action.searchParticipantResults.elements) || []));
    case SEARCH_PARTICIPANT_ERROR:
      return state;
    case ADD_PARTICIPANT:
      return state.set('selectedParticipants', fromJS((action.participants) || []))
        .set('searchParticipantResult', fromJS([]));
    default:
      return state;
  }
}

export default searchParticipantReducer;
