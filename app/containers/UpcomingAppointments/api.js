import queryString from '../../utils/queryString';
import { DEFAULT_PAGE_SIZE, DEFAULT_START_PAGE_NUMBER } from '../App/constants';
import request from '../../utils/request';
import { BASE_UPCOMING_APPOINTMENTS_API_URL, getEndpoint } from '../../utils/endpointService';

export default function getUpcomingAppointments() {
  const query = { pageNumber: DEFAULT_START_PAGE_NUMBER, pageSize: DEFAULT_PAGE_SIZE };
  const params = queryString(query);
  const baseEndpoint = getEndpoint(BASE_UPCOMING_APPOINTMENTS_API_URL);
  const requestURL = `${baseEndpoint}/search${params}`;
  return request(requestURL);
}
