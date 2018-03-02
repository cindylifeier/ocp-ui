/*
 *
 * ManageCommunicationPage actions
 *
 */

import {
  CREATE_COMMUNICATION, CREATE_COMMUNICATION_SUCCESS, SAVE_COMMUNICATION_ERROR,
  UPDATE_COMMUNICATION, UPDATE_COMMUNICATION_SUCCESS,
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

export function updateCommunicationSuccess(response) {
  return {
    type: UPDATE_COMMUNICATION_SUCCESS,
    response,
  };
}
