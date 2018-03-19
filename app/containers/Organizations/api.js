import queryString from 'utils/queryString';
import request from 'utils/request';
import { BASE_ORGANIZATIONS_API_URL, getEndpoint } from 'utils/endpointService';
import { DEFAULT_PAGE_SIZE } from 'containers/App/constants';


export function getOrganizations(showInactive, page) {
  const baseEndpoint = getEndpoint(BASE_ORGANIZATIONS_API_URL);
  const params = queryString({ showInactive, size: DEFAULT_PAGE_SIZE, page });
  // Todo: Change list organization endpoint
  const requestURL = `${baseEndpoint}/all/${params}`;
  return request(requestURL);
}

export function searchOrganizations(searchValue, showInactive, searchType, page) {
  const baseEndpoint = getEndpoint(BASE_ORGANIZATIONS_API_URL);
  const params = queryString({ searchValue, showInactive, searchType, size: DEFAULT_PAGE_SIZE, page });
  const requestURL = `${baseEndpoint}/search${params}`;
  return request(requestURL);
}
