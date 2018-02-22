
import * as queryString from 'query-string';
import request from '../../utils/request';
import getApiBaseUrl from '../../apiBaseUrlConfig';
import { PAGE_SIZE } from './constants';

const apiBaseUrl = getApiBaseUrl();

export function getRelatedPersons(patientId, showInActive, pageNumber) {
  const pageSize = PAGE_SIZE;
  const queryParams = { patientId, showInActive, pageNumber, pageSize };
  const stringifiedParams = queryString.stringify(queryParams);
  const url = `${apiBaseUrl}/related-persons/search?${stringifiedParams}`;
  return request(url);
}
