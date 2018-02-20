import { DEFAULT_PAGE_SIZE } from '../App/constants';
import request from '../../utils/request';
import queryString from '../../utils/queryString';
import { BASE_PRACTITIONERS_API_URL, getEndpoint } from '../../utils/endpointService';

export default function searchPractitioners(searchTerms, searchType, includeInactive, currentPage) {
  const params = queryString({
    searchType,
    searchValue: searchTerms,
    showInactive: includeInactive,
    page: currentPage,
    size: DEFAULT_PAGE_SIZE,
  });

  const baseEndpoint = getEndpoint(BASE_PRACTITIONERS_API_URL);
  const requestURL = `${baseEndpoint.url}/search${params}`;
  return request(requestURL, baseEndpoint.isSecured);
}
