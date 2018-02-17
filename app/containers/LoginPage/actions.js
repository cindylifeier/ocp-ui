/*
 *
 * LoginPage actions
 *
 */

import { LOGIN_REQUEST, LOGIN_SUCCESS, LOGOUT_REQUEST } from './constants';

export function requestLogin(loginCredentials) {
  return {
    type: LOGIN_REQUEST,
    loginCredentials,
  };
}

export function loginSuccess() {
  return {
    type: LOGIN_SUCCESS,
  };
}

export function requestLogout() {
  return {
    type: LOGOUT_REQUEST,
  };
}
