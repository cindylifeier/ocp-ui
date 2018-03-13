import { BASE_TASKS_API_URL, getEndpoint } from 'utils/endpointService';
import request from 'utils/request';

export function getUpcomingTasks(practitionerId) {
  const baseEndpoint = getEndpoint(BASE_TASKS_API_URL);
  const requestURL = `${baseEndpoint}?practitioner=${practitionerId}`;
  return request(requestURL);
}
