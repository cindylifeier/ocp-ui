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
  const initialParams = 'page=1&status=';
  let queryParams = '';
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
