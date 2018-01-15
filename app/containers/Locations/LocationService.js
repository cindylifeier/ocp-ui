/*
 *
 * Locations Service
 *
 */

import ApiService from '../../utils/ApiService';
import getApiBaseUrl from '../../apiBaseUrlConfig';
import { DEFAULT_PAGE_SIZE } from './constants';

const LocationService = {};
LocationService.getLocationsByIdAndStatus = function (organizationId, status, currentPage) {
  const url = createUrl(organizationId, status, currentPage);
  return ApiService.getData(url);
};

function createUrl(organizationId, status, currentPage) {
  const initialParams = `page=${currentPage}&size=${DEFAULT_PAGE_SIZE}&status=active,`;
  let queryParams = '';
  const apiBaseUrl = getApiBaseUrl();
  const baseUrl = `${apiBaseUrl}/organizations/${organizationId}`.concat('/locations?');
  if (status && status.length === 0) {
    queryParams = initialParams;
  } else if (status && status.length === 1) {
    queryParams = `${initialParams}${status[0]}`;
  } else if (status && status.length === 2) {
    queryParams = `${initialParams}${status[0]},${status[1]}`;
  }
  return baseUrl.concat(queryParams);
}

export default LocationService;
