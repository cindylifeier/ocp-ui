import queryString from '../../utils/queryString';
import { DEFAULT_PAGE_SIZE, DEFAULT_START_PAGE_NUMBER } from '../App/constants';
import request from '../../utils/request';
import { BASE_CARE_TEAMS_API_URL, getEndpoint } from '../../utils/endpointService';

export default function getCareTeams(query, statusList) {
  const { pageNumber = DEFAULT_START_PAGE_NUMBER, pageSize = DEFAULT_PAGE_SIZE } = query;
  const q = {
    ...query,
    pageNumber,
    pageSize,
    statusList,
  };
  const params = queryString(q);
  const requestEndpoint = getEndpoint(BASE_CARE_TEAMS_API_URL);
  const requestURL = `${requestEndpoint.url}/search${params}`;
  return request(requestURL, requestEndpoint.isSecured);
}
