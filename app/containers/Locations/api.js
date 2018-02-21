/*
 *
 * Locations Service
 *
 */

import { DEFAULT_PAGE_SIZE } from '../App/constants';
import request from '../../utils/request';
import { BASE_ORGANIZATIONS_API_URL, getEndpoint } from '../../utils/endpointService';

const baseEndpoint = getEndpoint(BASE_ORGANIZATIONS_API_URL);

export default function searchLocationsByIdAndStatus(organizationId, status, currentPage) {
  const url = createUrl(organizationId, status, currentPage);
  return request(url);
}

function createUrl(organizationId, status, currentPage) {
  const initialParams = `pageNumber=${currentPage}&pageSize=${DEFAULT_PAGE_SIZE}&statusList=active,`;
  let queryParams = '';
  const baseUrl = `${baseEndpoint}/${organizationId}`.concat('/locations?');
  if (status && status.length === 0) {
    queryParams = initialParams;
  } else if (status && status.length === 1) {
    queryParams = `${initialParams}${status[0]}`;
  } else if (status && status.length === 2) {
    queryParams = `${initialParams}${status[0]},${status[1]}`;
  }
  return baseUrl.concat(queryParams);
}
