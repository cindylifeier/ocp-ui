import { BASE_USERS_API_URL, getEndpoint } from 'utils/endpointService';
import request from 'utils/request';
import queryString from 'utils/queryString';

const baseUsersEndpoint = getEndpoint(BASE_USERS_API_URL);

export function getUser(resourceType, resourceId) {
  const params = queryString({
    resourceType,
    resourceId,
  });
  return request(`${baseUsersEndpoint}${params}`);
}

export function saveUser(userFormData) {
  return request(baseUsersEndpoint, {
    method: 'PUT',
    body: JSON.stringify(userFormData),
    headers: {
      'Content-Type': 'application/json',
    },
  });
}
