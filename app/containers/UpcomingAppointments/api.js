import { SEARCH_KEY, SEARCH_VALUE } from 'containers/UpcomingAppointments/constants';
import { BASE_APPOINTMENTS_API_URL, getEndpoint } from 'utils/endpointService';
import queryString from '../../utils/queryString';
import request from '../../utils/request';
import { DEFAULT_PAGE_SIZE } from '../App/constants';

export default function getUpcomingAppointments(query) {
  const { pageSize = DEFAULT_PAGE_SIZE } = query;
  const q = {
    ...query,
    searchKey: SEARCH_KEY,
    searchValue: SEARCH_VALUE,
    pageSize,
    showPastAppointments: false,
    sortByStartTimeAsc: true,
  };
  const params = queryString(q);
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
