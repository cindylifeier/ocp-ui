import { BASE_PRACTITIONERS_API_URL, BASE_USERS_API_URL, BASE_PATIENTS_API_URL, getEndpoint } from 'utils/endpointService';
import request from 'utils/request';
/* import queryString from 'utils/queryString';*/

const baseUsersEndpoint = getEndpoint(BASE_USERS_API_URL);
const basePractitionerEndpoint = getEndpoint(BASE_PRACTITIONERS_API_URL);
const basePatientEndpoint = getEndpoint(BASE_PATIENTS_API_URL);

export function getUser(resourceType, resourceId) {
/*  const params = queryString({
    resourceType,
    resourceId,
  });*/
  if (resourceType === 'Practitioner') {
    const requestURL = `${basePractitionerEndpoint}/${resourceId}`;
    return request(requestURL);
  }

  const requestURL = `${basePatientEndpoint}/${resourceId}`;
  return request(requestURL);

 /* return request(`${baseUsersEndpoint}${params}`);*/
}

export function saveUser(userFormData) {
  return request(baseUsersEndpoint, {
    method: 'POST',
    body: JSON.stringify(mapToBackendDto(userFormData)),
    headers: {
      'Content-Type': 'application/json',
    },
  });
}

export function mapToBackendDto(userFormData) {
  const { username, password, resourceType, resourceId, organization, role } = userFormData;
  return {
    resource: resourceType,
    username,
    password,
    resourceId,
    roles: [{ orgId: organization.split('/').pop(-1), role }],
  };
}
