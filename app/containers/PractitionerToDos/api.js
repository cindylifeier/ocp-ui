import queryString from 'query-string';
import request from 'utils/request';
import { BASE_TASKS_API_URL, getEndpoint } from 'utils/endpointService';

const baseEndpoint = getEndpoint(BASE_TASKS_API_URL);

export function getPractitionerToDos(practitionerId, definition) {
  const queryParams = { practitioner: practitionerId, definition };
  const stringifiedParams = queryString.stringify(queryParams);
  const url = `${baseEndpoint}?${stringifiedParams}`;
  return request(url);
}

export function getFilterToDos(practitionerId, definition, filterDate) {
  const queryParams = { practitioner: practitionerId, definition, filterDate };
  const stringifiedParams = queryString.stringify(queryParams);
  const url = `${baseEndpoint}?${stringifiedParams}`;
  return request(url);
}
