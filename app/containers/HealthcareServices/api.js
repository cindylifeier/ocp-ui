import getApiBaseUrl from '../../apiBaseUrlConfig';
import { DEFAULT_PAGE_SIZE } from '../App/constants';
import request from '../../utils/request';
import queryString from '../../utils/queryString';

const apiBaseUrl = getApiBaseUrl();

export function queryHealthcareServicesByOrganization(organizationId, status, currentPage) {
  const params = queryString({
    statusList: status,
    pageNumber: currentPage,
    pageSize: DEFAULT_PAGE_SIZE,
  });
  const url = `${apiBaseUrl}/organizations/${organizationId}/health-care-services${params}`;
  return request(url);
}

export function queryHealthcareServicesByLocation(organizationId, locationId, status, currentPage) {
  const params = queryString({
    statusList: status,
    pageNumber: currentPage,
    pageSize: DEFAULT_PAGE_SIZE,
  });
  const url = `${apiBaseUrl}/organizations/${organizationId}/health-care-services${params}`;
  // TODO: remove stub call once
  console.log(`stubbing call for ${apiBaseUrl}/organizations/${organizationId}/locations/${locationId}/health-care-services${params}`);
  // const url = `${apiBaseUrl}/organizations/${organizationId}/locations/${locationId}/health-care-services${params}`;
  return request(url);
}
