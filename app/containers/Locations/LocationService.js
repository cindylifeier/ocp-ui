/*
 *
 * Locations Service
 *
 */

import ApiService from '../../utils/ApiService';

const LocationService = {};
LocationService.getLocationsByIdAndStatus = function (organizationId, status) {
  const url = createUrl(organizationId, status);
  return ApiService.getData(url);
};

function createUrl(organizationId, status) {
  // TODO: Refactore code to pass page number when implementing pagination
  const initialParams = 'page=1&status=';
  let queryParams = '';
  // TODO: Get url dynamically
  const baseUrl = `http://localhost:8444/organizations/${organizationId}`.concat('/locations?');
  if (status && status.length === 1) {
    queryParams = `${initialParams}${status[0]}`;
  } else if (status && status.length === 2) {
    queryParams = `${initialParams}${status[0]},${status[1]}`;
  } else if (status && status.length === 3) {
    queryParams = `${initialParams}${status[0]},${status[1]},${status[2]}`;
  }
  return baseUrl.concat(queryParams);
}

export default LocationService;
