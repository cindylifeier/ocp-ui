import { DEFAULT_PAGE_SIZE } from './constants';
import getApiBaseUrl from '../../apiBaseUrlConfig';
import request from '../../utils/request';
import queryString from '../../utils/queryString';

const apiBaseURL = getApiBaseUrl();

export default function searchPatients(searchTerms, searchType, includeInactive, currentPage) {
  const params = queryString({
    value: searchTerms,
    type: searchType,
    showInactive: includeInactive,
    page: currentPage,
    size: DEFAULT_PAGE_SIZE,
  });

  const requestURL = `${apiBaseURL}/patients/search${params}`;
  return request(requestURL);
}
