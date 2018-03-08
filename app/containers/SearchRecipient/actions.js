/*
 *
 * SearchRecipient actions
 *
 */


import {
  ADD_RECIPIENT, GET_RECIPIENTS, GET_RECIPIENTS_ERROR,
  GET_RECIPIENTS_SUCCESS, INITIALIZE_SEARCH_RECIPIENT_RESULT, REMOVE_RECIPIENT, SET_SELECT_RECIPIENT_STATUS,
} from 'containers/SearchRecipient/constants';

export function getRecipients(patientId) {
  return {
    type: GET_RECIPIENTS,
    patientId,
  };
}

export function getRecipientsSuccess(recipients) {
  return {
    type: GET_RECIPIENTS_SUCCESS,
    recipients,
  };
}


export function getRecipientsError(error) {
  return {
    type: GET_RECIPIENTS_ERROR,
    error,
  };
}

export function addSelectedRecipients() {
  return {
    type: ADD_RECIPIENT,
  };
}

export function removeSelectedRecipient(checked, recipientReference) {
  return {
    type: REMOVE_RECIPIENT,
    checked,
    recipientReference,
  };
}

export function setSelectRecipientStatus(checked, recipientReference) {
  return {
    type: SET_SELECT_RECIPIENT_STATUS,
    checked,
    recipientReference,
  };
}

export function initializeSearchRecipients(initialSelectedRecipients) {
  return {
    type: INITIALIZE_SEARCH_RECIPIENT_RESULT,
    initialSelectedRecipients,
  };
}
