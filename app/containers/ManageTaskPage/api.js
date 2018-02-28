import isEmpty from 'lodash/isEmpty';
import find from 'lodash/find';
import queryString from '../../utils/queryString';
import request from '../../utils/request';
import { DEFAULT_PAGE_SIZE, EMPTY_STRING } from '../App/constants';
import {
  BASE_ORGANIZATIONS_API_URL,
  BASE_PRACTITIONERS_API_URL,
  BASE_TASKS_API_URL,
  getEndpoint,
} from '../../utils/endpointService';

export function getPatientById(patients, patientId) {
  if (!isEmpty(patients)) {
    return find(patients, { id: patientId });
  }
  return null;
}

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

export function getResourceName(resource) {
  const names = resource.name;
  return names && names
    .map((name) => {
      const firstName = name.firstName !== EMPTY_STRING ? name.firstName : EMPTY_STRING;
      const lastName = name.lastName !== EMPTY_STRING ? name.lastName : EMPTY_STRING;
      let fullName = EMPTY_STRING;
      fullName = ` ${firstName} ${lastName}`;
      return fullName;
    })
    .join(', ');
}

export function getResourceDisplayNameAndId(resource) {
  let displayName = resource.name;
  if (resource && resource.name && resource.logicalId) {
    displayName = `${resource.name}-${resource.logicalId}`;
  }
  return displayName;
}
