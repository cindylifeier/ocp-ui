import request from '../../utils/request';
import { getEndpoint, LOGIN_API_URL } from '../../utils/endpointService';

export function login(loginCredentials) {
  const requestEndpoint = getEndpoint(LOGIN_API_URL);
  return request(requestEndpoint, {
    method: 'POST',
    body: JSON.stringify(mapToBffCredential(loginCredentials)),
    headers: {
      'Content-Type': 'application/json',
    },
  });
}

function mapToBffCredential(loginCredentials) {
  const { username, password } = loginCredentials;
  return { username, password };
}
