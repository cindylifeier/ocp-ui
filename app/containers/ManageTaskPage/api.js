import isEmpty from 'lodash/isEmpty';
import find from 'lodash/find';
import queryString from '../../utils/queryString';
import request from '../../utils/request';
import { DEFAULT_PAGE_SIZE } from '../App/constants';
import { BASE_ORGANIZATIONS_API_URL, BASE_PRACTITIONERS_API_URL, BASE_TASKS_API_URL, getEndpoint } from '../../utils/endpointService';

export function getPatientById(patients, patientId) {
  if (!isEmpty(patients)) {
    return find(patients, { id: patientId });
  }
  return null;
}

export function getOrganization() {
  const query = { searchValue: 'ulss', searchType: 'name', pageNumber: 1, showInactive: false };
  const params = queryString({ searchValue: query.searchValue, showInactive: query.showInactive, searchType: query.searchType, size: DEFAULT_PAGE_SIZE, page: query.pageNumber });
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
  const query = { searchValue: 'gooddoc', searchType: 'name', pageNumber: 1, showInactive: false };
  const params = queryString({ searchValue: query.searchValue, showInactive: query.showInactive, searchType: query.searchType, size: DEFAULT_PAGE_SIZE, page: query.pageNumber });
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
