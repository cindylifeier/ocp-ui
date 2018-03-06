/*
 *
 * ManageCommunicationPage actions
 *
 */
import {
  CREATE_COMMUNICATION, CREATE_COMMUNICATION_SUCCESS,
  SAVE_COMMUNICATION_ERROR, UPDATE_COMMUNICATION,
  GET_EPISODE_OF_CARES, GET_EPISODE_OF_CARES_SUCCESS,
  INITIALIZE_SEARCH_RECIPIENT, REMOVE_RECIPIENT,
} from './constants';


export function createCommunication(communication, patientId, handleSubmitting) {
  return {
    type: CREATE_COMMUNICATION,
    communication,
    patientId,
    handleSubmitting,
  };
}

export function createCommunicationSuccess(response) {
  return {
    type: CREATE_COMMUNICATION_SUCCESS,
    response,
  };
}

export function saveCommunicationError(error) {
  return {
    type: SAVE_COMMUNICATION_ERROR,
    error,
  };
}

export function updateCommunication(communication, patientId, handleSubmitting) {
  return {
    type: UPDATE_COMMUNICATION,
    communication,
    patientId,
    handleSubmitting,
  };
}

export function getEpisodeOfCares(patientId) {
  return {
    type: GET_EPISODE_OF_CARES,
    patientId,
  };
}

export function getEpisodeOfCaresSuccess(episodeOfCares) {
  return {
    type: GET_EPISODE_OF_CARES_SUCCESS,
    episodeOfCares,
  };
}

export function initializeSearchRecipientResults() {
  return {
    type: INITIALIZE_SEARCH_RECIPIENT,
  };
}
export function removeRecipient(recipient) {
  return {
    type: REMOVE_RECIPIENT,
    recipient,
  };
}
