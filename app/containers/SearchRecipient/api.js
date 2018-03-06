import * as queryString from 'query-string';
import request from '../../utils/request';
import { BASE_COMMUNICATION_API_URL, getEndpoint } from '../../utils/endpointService';

export function getRecipients(patientId) {
  const baseEndpoint = getEndpoint(BASE_COMMUNICATION_API_URL);
  const queryParams = { searchKey: 'patientId', searchValue: patientId };
  const stringifiedParams = queryString.stringify(queryParams);
  const url = `${baseEndpoint}/search?${stringifiedParams}`;
  return request(url);
}
