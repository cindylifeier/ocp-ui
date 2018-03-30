import queryString from 'query-string';
import request from 'utils/request';
import { BASE_TASKS_API_URL, getEndpoint } from 'utils/endpointService';

const baseEndpoint = getEndpoint(BASE_TASKS_API_URL);

export function getPractitionerToDos(practitionerId, definition) {
  const queryParams = { practitionerId, definition };
  const stringifiedParams = queryString.stringify(queryParams);
  const url = `${baseEndpoint}/subtasks?${stringifiedParams}`;
  return request(url);
}
