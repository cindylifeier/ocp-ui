import { DEFAULT_PAGE_SIZE } from '../App/constants';
import request from '../../utils/request';
import queryString from '../../utils/queryString';
import { BASE_PATIENTS_API_URL, getEndpoint } from '../../utils/endpointService';

export default function searchPatients(searchTerms, searchType, includeInactive, currentPage) {
  const params = queryString({
    value: searchTerms,
    type: searchType,
    showInactive: includeInactive,
    page: currentPage,
    size: DEFAULT_PAGE_SIZE,
  });

  const baseEndpoint = getEndpoint(BASE_PATIENTS_API_URL);
  const requestURL = `${baseEndpoint.url}/search${params}`;
  return request(requestURL, baseEndpoint.isSecured);
}
