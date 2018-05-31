/*
 *
 * ManageClientPage actions
 *
 */

import { SAVE_CLIENT, SAVE_CLIENT_ERROR } from './constants';

export function saveClient(clientFormData, handleSubmitting) {
  return {
    type: SAVE_CLIENT,
    clientFormData,
    handleSubmitting,
  };
}

export function saveClientError() {
  return {
    type: SAVE_CLIENT_ERROR,
  };
}
