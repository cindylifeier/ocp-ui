
import * as queryString from 'query-string';
import request from '../../utils/request';
import { PAGE_SIZE } from './constants';
import { getEndpoint, LOOKUPS_API_URL } from '../../utils/endpointService';
const baseEndpoint = getEndpoint(LOOKUPS_API_URL);

export function getRelatedPersons(patientId, showInActive, pageNumber) {
  const pageSize = PAGE_SIZE;
  const queryParams = { patientId, showInActive, pageNumber, pageSize };
  const stringifiedParams = queryString.stringify(queryParams);
  const url = `${baseEndpoint}/related-persons/search?${stringifiedParams}`;
  return request(url);
}
