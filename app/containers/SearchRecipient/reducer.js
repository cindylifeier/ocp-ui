/*
 *
 * SearchRecipient reducer
 *
 */

import { fromJS } from 'immutable';
import {
  ADD_RECIPIENT,
  GET_RECIPIENTS_ERROR, GET_RECIPIENTS_SUCCESS,
  INITIALIZE_SEARCH_RECIPIENT_RESULT, REMOVE_RECIPIENT, SET_SELECT_RECIPIENT_STATUS,
} from 'containers/SearchRecipient/constants';
import { INITIALIZE_SEARCH_RECIPIENT } from 'containers/ManageCommunicationPage/constants';

const initialState = fromJS({
  recipients: [],
  selectedRecipients: [],
});

function searchRecipientReducer(state = initialState, action) {
  switch (action.type) {
    case INITIALIZE_SEARCH_RECIPIENT:
      return state
        .set('selectedRecipients', fromJS((action.initialSelectedRecipients) || []))
        .set('recipients', fromJS([]));
    case GET_RECIPIENTS_SUCCESS:
      return state
        // .set('recipients', fromJS((action.recipients && action.recipients.elements) || []));
        .set('recipients', fromJS((action.recipients) || []));
    case INITIALIZE_SEARCH_RECIPIENT_RESULT:
      return state
        .set('recipients', fromJS([]));
    case ADD_RECIPIENT: {
      const recipients = state.get('recipients');
      const recipientsAsArray = recipients.toJS();
      const selectedRecipients = [];
      recipientsAsArray.forEach((recipient) => {
        if (recipient.checked) {
          selectedRecipients.push({ reference: recipient.reference, display: recipient.display });
        }
      });
      return state.set('selectedRecipients', fromJS((selectedRecipients) || []));
    }
    case REMOVE_RECIPIENT: {
      const selectedRecipients = state.get('selectedRecipients');
      const selectedRecipientsAsArray = selectedRecipients.toJS();
      const recipients = [];
      selectedRecipientsAsArray.forEach((recipient) => {
        if (recipient.reference !== action.recipientReference) {
          recipients.push(recipient);
        }
      });
      return state.set('selectedRecipients', fromJS((recipients) || []));
    }
    case SET_SELECT_RECIPIENT_STATUS: {
      const recipients = state.get('recipients');
      const recipientsAsArray = recipients.toJS();
      for (let i = 0; i < recipientsAsArray.length; i += 1) {
        if (recipientsAsArray[1].reference === action.recipientReference) {
          recipientsAsArray[1].checked = action.checked;
        }
      }
      // recipientsAsArray.forEach((recipient) => {
      //   if (recipient.reference === action.recipientReference) {
      //     recipient.checked = action.checked;
      //   }
      // });
      return state.set('recipients', fromJS((recipientsAsArray) || []));
    }
    case GET_RECIPIENTS_ERROR:
      return state;
    default:
      return state;
  }
}

export default searchRecipientReducer;
