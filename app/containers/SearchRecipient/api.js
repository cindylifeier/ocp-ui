import * as queryString from 'query-string';
import request from '../../utils/request';
import { BASE_PARTICIPANTS_API_URL, getEndpoint } from '../../utils/endpointService';

export function getRecipients(patientId, communicationId) {
  const baseEndpoint = getEndpoint(BASE_PARTICIPANTS_API_URL);
  let queryParams = '';
  if (patientId && communicationId) {
    queryParams = { patient: patientId, communication: communicationId };
  } else if (patientId) {
    queryParams = { patient: patientId };
  }
  const stringifiedParams = queryString.stringify(queryParams);
  const url = `${baseEndpoint}?${stringifiedParams}`;
  return request(url);
}
