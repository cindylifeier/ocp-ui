import * as queryString from 'query-string';
import request from 'utils/request';
import { BASE_TASKS_API_URL, getEndpoint } from 'utils/endpointService';

const baseEndpoint = getEndpoint(BASE_TASKS_API_URL);

export function getTodos(patientId, practitionerId, definition) {
  let queryParams = '';
  if (patientId) {
    queryParams = { patientId, definition };
  } else if (practitionerId) {
    queryParams = { practitionerId, definition };
  }
  const stringifiedParams = queryString.stringify(queryParams);
  const url = `${baseEndpoint}/subtasks?${stringifiedParams}`;
  return request(url);
}

export function getTodoMainTask(patientId, definition) {
  const queryParams = { patient: patientId, definition };
  const stringifiedParams = queryString.stringify(queryParams);
  const url = `${baseEndpoint}/task-references?${stringifiedParams}`;
  return request(url);
}
