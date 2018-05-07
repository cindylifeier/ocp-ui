import * as queryString from 'query-string';
import request from 'utils/request';
import { BASE_CONSENTS_API_URL, getEndpoint } from 'utils/endpointService';

export function getActors(patientId) {
  const baseEndpoint = getEndpoint(BASE_CONSENTS_API_URL);
  const queryParams = {};
  if (patientId) {
    queryParams.patient = patientId;
  }
  const stringifiedParams = queryString.stringify(queryParams);
  const url = `${baseEndpoint}/actors?${stringifiedParams}`;
  return request(url);
}
