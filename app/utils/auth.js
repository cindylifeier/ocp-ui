import isEmpty from 'lodash/isEmpty';
import includes from 'lodash/includes';
import { retrieveAuthStatus, retrieveToken } from './tokenService';

const ACCESS_SCOPE = 'ocpUi.access';

export function hasAccessScopeInToken(token) {
  if (!isEmpty(token)) {
    return includes(token.scope, ACCESS_SCOPE);
  }
  return false;
}

export function checkAuthenticated() {
  let isAuthenticated = false;
  const authStatus = retrieveAuthStatus();
  const token = retrieveToken();
  if (authStatus && hasAccessScopeInToken(token)) {
    isAuthenticated = authStatus;
  }
  return isAuthenticated;
}
