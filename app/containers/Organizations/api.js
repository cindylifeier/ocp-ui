import queryString from '../../utils/queryString';
import getApiBaseUrl from '../../apiBaseUrlConfig';
import { DEFAULT_PAGE_SIZE } from '../App/constants';
import request from '../../utils/request';

const baseApiUrl = getApiBaseUrl();

export default function searchOrganizations(searchValue, showInactive, searchType, page) {
  const params = queryString({ searchValue, showInactive, searchType, size: DEFAULT_PAGE_SIZE, page });
  const requestURL = `${baseApiUrl}/organizations/search${params}`;
  return request(requestURL);
}
