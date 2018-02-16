import request from '../../utils/request';

export function login(loginCredentials) {
  const requestURL = '/ocp-ui-api/login';
  return request(requestURL, {
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
