import isEmpty from 'lodash/isEmpty';
import includes from 'lodash/includes';
import jwt from 'jsonwebtoken';

const ACCESS_SCOPE = 'ocpUi.access';

export function hasAccessScopeInToken(token) {
  if (!isEmpty(token)) {
    return includes(token.scope, ACCESS_SCOPE);
  }
  return false;
}

export function isTokenExpired(token) {
  if (!isEmpty(token)) {
    const currentTime = new Date().getTime() / 1000;
    const decodedAccessToken = jwt.decode(token.access_token);
    return currentTime > decodedAccessToken.exp;
  }
  return true;
}
