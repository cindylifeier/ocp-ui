import queryString from '../../utils/queryString';
import getApiBaseUrl from '../../apiBaseUrlConfig';
import { DEFAULT_PAGE_SIZE, DEFAULT_START_PAGE_NUMBER } from '../App/constants';
import request from '../../utils/request';

const baseApiUrl = getApiBaseUrl();

export default function getCareTeams(query, statusList) {
  const { pageNumber = DEFAULT_START_PAGE_NUMBER, pageSize = DEFAULT_PAGE_SIZE } = query;
  const q = {
    ...query,
    pageNumber,
    pageSize,
    statusList,
  };
  const params = queryString(q);
  const requestURL = `${baseApiUrl}/care-teams/search${params}`;
  return request(requestURL);
}
