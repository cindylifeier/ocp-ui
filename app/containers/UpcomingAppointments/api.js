import { SEARCH_KEY, SEARCH_VALUE } from 'containers/UpcomingAppointments/constants';
import { BASE_APPOINTMENTS_API_URL, getEndpoint } from 'utils/endpointService';
import queryString from '../../utils/queryString';
import request from '../../utils/request';
import { DEFAULT_PAGE_SIZE, DEFAULT_START_PAGE_NUMBER } from '../App/constants';

export default function getUpcomingAppointments() {
  const query = {
    searchKey: SEARCH_KEY,
    searchValue: SEARCH_VALUE,
    pageNumber: DEFAULT_START_PAGE_NUMBER,
    pageSize: DEFAULT_PAGE_SIZE,
  };
  const params = queryString(query);
  const baseEndpoint = getEndpoint(BASE_APPOINTMENTS_API_URL);
  const requestURL = `${baseEndpoint}/search${params}`;
  return request(requestURL);
}

export function cancelAppointment(id) {
  const baseEndpoint = getEndpoint(BASE_APPOINTMENTS_API_URL);
  const requestURL = `${baseEndpoint}/${id}/cancel`;
  return request(requestURL, {
    method: 'PUT',
    headers: {
      'Content-Type': 'application/json',
    },
  });
}
