/*
 *
 * ManageClientPage actions
 *
 */

import { SAVE_CLIENT, SAVE_CLIENT_ERROR, SAVE_CLIENT_SUCCESS, GET_CLIENTS, GET_CLIENTS_SUCCESS, GET_CLIENTS_ERROR } from './constants';

export function saveClient(clientFormData, handleSubmitting) {
  return {
    type: SAVE_CLIENT,
    clientFormData,
    handleSubmitting,
  };
}

export function saveClientSuccess(clientMetaDto) {
  return {
    type: SAVE_CLIENT_SUCCESS,
    clientMetaDto,
  };
}

export function saveClientError() {
  return {
    type: SAVE_CLIENT_ERROR,
  };
}

export function getClients() {
  return {
    type: GET_CLIENTS,
  };
}

export function getClientsSuccess(clients) {
  return {
    type: GET_CLIENTS_SUCCESS,
    clients,
  };
}

export function getClientsError(error) {
  return {
    type: GET_CLIENTS_ERROR,
    error,
  };
}
