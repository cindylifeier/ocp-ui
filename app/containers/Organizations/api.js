import queryString from '../../utils/queryString';
import { DEFAULT_PAGE_SIZE } from '../App/constants';
import request from '../../utils/request';
import { BASE_ORGANIZATIONS_API_URL, getEndpoint } from '../../utils/endpointService';


export default function getOrganizations(searchValue, showInactive, searchType, page) {
  const baseEndpoint = getEndpoint(BASE_ORGANIZATIONS_API_URL);
  const params = queryString({ searchValue, showInactive, searchType, size: DEFAULT_PAGE_SIZE, page });
  const requestURL = `${baseEndpoint}/search${params}`;
  return request(requestURL);
}
