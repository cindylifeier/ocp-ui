/*
 *
 * SearchRecipient reducer
 *
 */

import { fromJS } from 'immutable';
import {
  GET_RECIPIENTS_ERROR, GET_RECIPIENTS_SUCCESS,
  INITIALIZE_SEARCH_RECIPIENT_RESULT,
} from 'containers/SearchRecipient/constants';
import { INITIALIZE_SEARCH_RECIPIENT } from 'containers/ManageCommunicationPage/constants';

const initialState = fromJS({
  recipients: [],
  selectedRecipients: [],
});

function searchRecipientReducer(state = initialState, action) {
  switch (action.type) {
    case GET_RECIPIENTS_SUCCESS:
      return state
        // .set('recipients', fromJS((action.recipients && action.recipients.elements) || []));
        .set('recipients', fromJS((action.recipients) || []));
    case INITIALIZE_SEARCH_RECIPIENT_RESULT:
      return state
        .set('recipients', fromJS([]));
    case INITIALIZE_SEARCH_RECIPIENT:
      return state
        .set('selectedRecipients', fromJS((action.initialSelectedRecipients) || []))
        .set('recipients', fromJS([]));
    case GET_RECIPIENTS_ERROR:
      return state;
    default:
      return state;
  }
}

export default searchRecipientReducer;
