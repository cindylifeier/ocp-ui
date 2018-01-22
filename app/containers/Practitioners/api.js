import { DEFAULT_PAGE_SIZE } from '../App/constants';
import getApiBaseUrl from '../../apiBaseUrlConfig';
import request from '../../utils/request';
import queryString from '../../utils/queryString';

const apiBaseURL = getApiBaseUrl();

export default function searchPractitioners(searchTerms, searchType, includeInactive, currentPage) {
  const params = queryString({
    searchType,
    searchValue: searchTerms,
    showInactive: includeInactive,
    page: currentPage,
    size: DEFAULT_PAGE_SIZE,
  });

  const requestURL = `${apiBaseURL}/practitioners/search${params}`;
  return request(requestURL);
}
