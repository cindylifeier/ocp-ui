import {
  BASE_PATIENTS_API_URL,
  BASE_PRACTITIONERS_API_URL,
  BASE_USERS_API_URL,
  getEndpoint,
} from 'utils/endpointService';
import request from 'utils/request';


const baseUsersEndpoint = getEndpoint(BASE_USERS_API_URL);
const basePractitionerEndpoint = getEndpoint(BASE_PRACTITIONERS_API_URL);
const basePatientEndpoint = getEndpoint(BASE_PATIENTS_API_URL);

export function getUser(resourceType, resourceId) {
  if (resourceType === 'Practitioner') {
    const requestURL = `${basePractitionerEndpoint}/${resourceId}`;
    return request(requestURL);
  }

  const requestURL = `${basePatientEndpoint}/${resourceId}`;
  return request(requestURL);
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
  const { username, password, resourceType, resourceId, roles } = userFormData;
  const ORG_REFERENCE_SEPARATOR = '/';
  return {
    resource: resourceType,
    username,
    password,
    resourceId,
    roles: roles.map((role) => ({
      orgId: role.organization.reference.split(ORG_REFERENCE_SEPARATOR).pop(),
      role: role.group.id,
    })),
  };
}
