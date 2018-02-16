const AUTH_TOKEN = 'auth_token';

export function storeToken(tokenObj) {
  sessionStorage.setItem(AUTH_TOKEN, JSON.stringify(tokenObj));
}

export function retrieveToken() {
  return JSON.parse(sessionStorage.getItem(AUTH_TOKEN));
}

export function removeToken() {
  return sessionStorage.removeItem(AUTH_TOKEN);
}
