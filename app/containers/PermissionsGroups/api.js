import { BASE_GROUPS_API_URL, BASE_SCOPES_API_URL, getEndpoint } from 'utils/endpointService';
import request from 'utils/request';

const baseGroupsEndpoint = getEndpoint(BASE_GROUPS_API_URL);
const baseScopesEndpoint = getEndpoint(BASE_SCOPES_API_URL);

export function getGroups() {
  return request(baseGroupsEndpoint);
}

export function getScopes() {
  return request(baseScopesEndpoint);
}

export function createGroup(group) {
  return request(baseGroupsEndpoint, {
    method: 'POST',
    body: JSON.stringify(group),
    headers: {
      'Content-Type': 'application/json',
    },
  });
}

export function updateGroup(group) {
  return request(baseGroupsEndpoint, {
    method: 'PUT',
    body: JSON.stringify(group),
    headers: {
      'Content-Type': 'application/json',
    },
  });
}


export function getErrorDetail(error) {
  let errorDetail = error.message;
  if (error && error.message === 'Failed to fetch') {
    errorDetail = ' Server is offline.';
  } else if (error && error.response && error.response.status === 500) {
    errorDetail = ' Unknown server error.';
  }
  return errorDetail;
}
