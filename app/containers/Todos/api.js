import * as queryString from 'query-string';
import request from '../../utils/request';
import { PAGE_SIZE } from './constants';
import { BASE_TASKS_API_URL, getEndpoint } from '../../utils/endpointService';

const baseEndpoint = getEndpoint(BASE_TASKS_API_URL);

export function getTodos(patientId, definition, pageNumber) {
  const pageSize = PAGE_SIZE;
  const queryParams = { patientId, definition, pageNumber, pageSize };
  const stringifiedParams = queryString.stringify(queryParams);
  const url = `${baseEndpoint}/subtasks/search?${stringifiedParams}`;
  return request(url);
}
