import queryString from '../../utils/queryString';
import getApiBaseUrl from '../../apiBaseUrlConfig';
import { DEFAULT_PAGE_SIZE, DEFAULT_START_PAGE_NUMBER } from '../App/constants';
import request from '../../utils/request';

const baseApiUrl = getApiBaseUrl();

export default function getTasks(query) {
  const { pageNumber = DEFAULT_START_PAGE_NUMBER, pageSize = DEFAULT_PAGE_SIZE } = query;
  const q = {
    ...query,
    pageNumber,
    pageSize,
  };
  const params = queryString(q);
  const requestURL = `${baseApiUrl}/tasks/search${params}`;
  return request(requestURL);
}
