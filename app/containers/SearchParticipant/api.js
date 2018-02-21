
import * as queryString from 'query-string';
import request from '../../utils/request';
import getApiBaseUrl from '../../apiBaseUrlConfig';

const apiBaseUrl = getApiBaseUrl();

export function searchParticipant(value, member, patientId) {
  const queryParams = { value, member, patientId };
  const stringifiedParams = queryString.stringify(queryParams);
  const url = `${apiBaseUrl}/participants/search?${stringifiedParams}`;
  return request(url);
}
