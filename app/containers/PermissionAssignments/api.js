import { BASE_USERS_API_URL, getEndpoint } from 'utils/endpointService';
import request from 'utils/request';
import queryString from 'utils/queryString';

const baseUsersEndpoint = getEndpoint(BASE_USERS_API_URL);

export function getUsers(organizationId) {
  const params = queryString({
    organizationId,
  });
  return request(`${baseUsersEndpoint}${params}`);
}

