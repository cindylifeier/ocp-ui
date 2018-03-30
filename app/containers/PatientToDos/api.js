import queryString from 'query-string';
import request from 'utils/request';
import { BASE_TASKS_API_URL, getEndpoint } from 'utils/endpointService';

const baseEndpoint = getEndpoint(BASE_TASKS_API_URL);

export function getPatientToDos(patientId, practitionerId, definition) {
  let queryParams = '';
  if (patientId && !practitionerId) {
    queryParams = { patientId, definition };
  } else if (patientId && practitionerId) {
    queryParams = { patientId, practitionerId, definition };
  }
  const stringifiedParams = queryString.stringify(queryParams);
  const url = `${baseEndpoint}/subtasks?${stringifiedParams}`;
  return request(url);
}

export function getToDoMainTask(patientId, organizationId, definition) {
  const queryParams = { patient: patientId, organization: organizationId, definition };
  const stringifiedParams = queryString.stringify(queryParams);
  const url = `${baseEndpoint}/task-references?${stringifiedParams}`;
  return request(url);
}

export function cancelToDo(patientId, toDoLogicalId) {
  const queryParams = { patient: patientId, logicalId: toDoLogicalId };
  const stringifiedParams = queryString.stringify(queryParams);
  console.log(stringifiedParams);
  // const url = `${baseEndpoint}/task-references?${stringifiedParams}`;
  // return request(url);
}
