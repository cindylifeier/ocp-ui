/*
 *
 * LoginPage actions
 *
 */

import { LOGIN, LOGIN_SUCCESS, LOGOUT } from './constants';

export function login(loginCredentials) {
  return {
    type: LOGIN,
    loginCredentials,
  };
}

export function loginSuccess(loggedData) {
  return {
    type: LOGIN_SUCCESS,
    loggedData,
  };
}

export function logout() {
  return {
    type: LOGOUT,
  };
}
