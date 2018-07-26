/*
 *
 * ChangePassword actions
 *
 */

import { CHANGE_PASSWORD, CHANGE_PASSWORD_ERROR, CHANGE_PASSWORD_SUCCESS } from './constants';

export function changePassword() {
  return {
    type: CHANGE_PASSWORD,
  };
}

export function changePasswordSuccess() {
  return {
    type: CHANGE_PASSWORD_SUCCESS,
  };
}

export function changePasswordError(error) {
  return {
    type: CHANGE_PASSWORD_ERROR,
    error,
  };
}
