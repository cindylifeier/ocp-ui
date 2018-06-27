import { BASE_USERS_API_URL, getEndpoint } from 'utils/endpointService';
import request from 'utils/request';

const baseUsersEndpoint = getEndpoint(BASE_USERS_API_URL);

export function getUsers() {
  return request(baseUsersEndpoint);
}

