/*
 *
 * Locations Service
 *
 */

import ApiService from '../../utils/ApiService';
import getApiBaseUrl from '../../apiBaseUrlConfig';

const LocationService = {};
LocationService.getLocationsByIdAndStatus = function (organizationId, status) {
  const url = createUrl(organizationId, status);
  return ApiService.getData(url);
};

function createUrl(organizationId, status) {
  // TODO: Refactore code to pass page number when implementing pagination
  const initialParams = 'page=1&status=active,';
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
