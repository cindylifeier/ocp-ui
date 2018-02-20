import * as queryString from 'query-string';
import request from '../../utils/request';
import { BASE_PARTICIPANTS_API_URL, getEndpoint } from '../../utils/endpointService';

export function searchParticipant(value, member) {
  const baseEndpoint = getEndpoint(BASE_PARTICIPANTS_API_URL);
  const queryParams = { value, member };
  const stringifiedParams = queryString.stringify(queryParams);
  const url = `${baseEndpoint.url}/search?${stringifiedParams}&showInActive=true`;
  return request(url, baseEndpoint.isSecured);
}
