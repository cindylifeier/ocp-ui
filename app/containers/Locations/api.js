/*
 *
 * Locations Service
 *
 */

import { DEFAULT_PAGE_SIZE } from 'containers/App/constants';
import request from 'utils/request';
import queryString from 'utils/queryString';
import { BASE_ORGANIZATIONS_API_URL, getEndpoint } from 'utils/endpointService';

const baseEndpoint = getEndpoint(BASE_ORGANIZATIONS_API_URL);

export default function searchLocationsByIdAndStatus(organizationId, status, currentPage) {
  const url = createUrl(organizationId, status, currentPage);
  return request(url);
}

function createUrl(organizationId, statusList, pageNumber) {
  const params = { pageNumber, statusList, pageSize: DEFAULT_PAGE_SIZE };
  const queryParams = queryString(params);
  const baseUrl = `${baseEndpoint}/${organizationId}`.concat('/locations');
  return baseUrl.concat(queryParams);
}
