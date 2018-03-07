import queryString from '../../utils/queryString';
import { DEFAULT_PAGE_SIZE, DEFAULT_START_PAGE_NUMBER } from '../App/constants';
import request from '../../utils/request';
import { BASE_UPCOMING_APPOINTMENTS_API_URL, getEndpoint } from '../../utils/endpointService';

export default function getUpComingAppointments(query) {
  const { pageNumber = DEFAULT_START_PAGE_NUMBER, pageSize = DEFAULT_PAGE_SIZE } = query;
  const q = {
    ...query,
    pageNumber,
    pageSize,
  };
  const params = queryString(q);
  const baseEndpoint = getEndpoint(BASE_UPCOMING_APPOINTMENTS_API_URL);
  const requestURL = `${baseEndpoint}/search${params}`;
  return request(requestURL);
}
