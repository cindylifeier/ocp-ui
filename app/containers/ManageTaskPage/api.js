import isEmpty from 'lodash/isEmpty';
import find from 'lodash/find';
import {
  BASE_ORGANIZATIONS_API_URL,
  BASE_PRACTITIONERS_API_URL,
  BASE_TASKS_API_URL,
  BASE_EPISODE_OF_CARES_API_URL,
  getEndpoint,
} from 'utils/endpointService';
import queryString from 'utils/queryString';
import { DEFAULT_PAGE_SIZE } from 'containers/App/constants';
import request from 'utils/request';


export function getOrganization() {
  const query = { searchValue: 'great', searchType: 'name', pageNumber: 1, showInactive: false };
  const params = queryString({
    searchValue: query.searchValue,
    showInactive: query.showInactive,
    searchType: query.searchType,
    size: DEFAULT_PAGE_SIZE,
    page: query.pageNumber,
  });
  const baseEndpoint = getEndpoint(BASE_ORGANIZATIONS_API_URL);
  const requestURL = `${baseEndpoint}/search${params}`;
  return request(requestURL);
}

export function getActivityDefinitions(organizationId) {
  const baseEndpoint = getEndpoint(BASE_ORGANIZATIONS_API_URL);
  const requestURL = `${baseEndpoint}/${organizationId.organizationId}/activity-definitions`;
  return request(requestURL);
}

export function getEventTypes(patientId) {
  const baseEndpoint = getEndpoint(BASE_EPISODE_OF_CARES_API_URL);
  const requestURL = `${baseEndpoint}?patient=${patientId}`;
  return request(requestURL);
}


export function getPractitioners() {
  const query = { searchValue: 'johnson', searchType: 'name', pageNumber: 1, showInactive: false };
  const params = queryString({
    searchValue: query.searchValue,
    showInactive: query.showInactive,
    searchType: query.searchType,
    size: DEFAULT_PAGE_SIZE,
    page: query.pageNumber,
  });
  const baseEndpoint = getEndpoint(BASE_PRACTITIONERS_API_URL);
  const requestURL = `${baseEndpoint}/search${params}`;
  return request(requestURL);
}

export function createTask(taskFormData) {
  const baseEndpoint = getEndpoint(BASE_TASKS_API_URL);
  const requestURL = `${baseEndpoint}`;
  return request(requestURL, {
    method: 'POST',
    body: JSON.stringify(taskFormData),
    headers: {
      'Content-Type': 'application/json',
    },
  });
}

export function updateTask(taskFormData) {
  const baseEndpoint = getEndpoint(BASE_TASKS_API_URL);
  const requestURL = `${baseEndpoint}`;
  return request(requestURL, {
    method: 'PUT',
    body: JSON.stringify(taskFormData),
    headers: {
      'Content-Type': 'application/json',
    },
  });
}

export function getTaskByIdFromStore(tasks, logicalId) {
  if (!isEmpty(tasks)) {
    return find(tasks, { logicalId });
  }
  return null;
}

export function getTaskById(logicalId) {
  const baseEndpoint = getEndpoint(BASE_TASKS_API_URL);
  const requestURL = `${baseEndpoint}/${logicalId}`;
  return request(requestURL);
}
