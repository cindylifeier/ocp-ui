import request from 'utils/request';
import queryString from 'utils/queryString';
import { BASE_PRACTITIONERS_API_URL, getEndpoint } from 'utils/endpointService';
import { DEFAULT_PAGE_SIZE } from 'containers/App/constants';

export default function searchPractitioners(searchType, searchValue, showInactive, page) {
  const baseEndpoint = getEndpoint(BASE_PRACTITIONERS_API_URL);
  const params = queryString({ searchType, searchValue, showInactive, size: DEFAULT_PAGE_SIZE, page });
  const requestURL = `${baseEndpoint}/search${params}`;
  return request(requestURL);
}
