import { BASE_APPOINTMENTS_API_URL, getEndpoint } from 'utils/endpointService';
import queryString from 'utils/queryString';
import request from 'utils/request';

export default function getAppointmentsApi(query) {
  const params = queryString(query);
  console.log('aaa');
  console.log(params);
  const baseEndpoint = getEndpoint(BASE_APPOINTMENTS_API_URL);
  const requestURL = `${baseEndpoint}/search${params}`;
  return request(requestURL);
}
