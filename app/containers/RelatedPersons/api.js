
import * as queryString from 'query-string';
import request from '../../utils/request';
import getApiBaseUrl from '../../apiBaseUrlConfig';

const apiBaseUrl = getApiBaseUrl();

export function getRelatedPersons(patientId, showInActive) {
  const queryParams = { patientId, showInActive };
  const stringifiedParams = queryString.stringify(queryParams);
  const url = `${apiBaseUrl}/related-persons/search?${stringifiedParams}`;
  return request(url);
}
