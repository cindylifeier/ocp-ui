import getApiBaseUrl from '../../apiBaseUrlConfig';
import { DEFAULT_PAGE_SIZE } from '../App/constants';
import request from '../../utils/request';
import queryString from '../../utils/queryString';

const apiBaseUrl = getApiBaseUrl();

export function getHealthcareServicesByOrganization(organizationId, status, currentPage) {
  const params = queryString({
    statusList: status,
    pageNumber: currentPage,
    pageSize: DEFAULT_PAGE_SIZE,
  });
  const url = `${apiBaseUrl}/organizations/${organizationId}/health-care-services${params}`;
  return request(url);
}

export function getHealthcareServicesByLocation(organizationId, locationId, status, currentPage) {
  const params = queryString({
    statusList: status,
    pageNumber: currentPage,
    pageSize: DEFAULT_PAGE_SIZE,
  });
  const url = `${apiBaseUrl}/organizations/${organizationId}/locations/${locationId}/health-care-services${params}`;
  return request(url);
}
