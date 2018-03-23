import * as queryString from 'query-string';
import request from 'utils/request';
import { BASE_TASKS_API_URL, getEndpoint } from 'utils/endpointService';

const baseEndpoint = getEndpoint(BASE_TASKS_API_URL);

export function getTodos(patientId, definition) {
  console.log(patientId);
  console.log(definition);
  // TODO: Remove this hard code
  const queryParams = { patientId: '152', definition: 'harry' };
  // const queryParams = { patientId, definition };
  const stringifiedParams = queryString.stringify(queryParams);
  const url = `${baseEndpoint}/subtasks?${stringifiedParams}`;
  return request(url);
}

export function getTodoMainTask(patientId, definition) {
  const queryParams = { patient: patientId, definition };
  const stringifiedParams = queryString.stringify(queryParams);
  const url = `${baseEndpoint}/task-reference?${stringifiedParams}`;
  return request(url);
}
