import getApiBaseUrl from '../../apiBaseUrlConfig';
import { DEFAULT_PAGE_SIZE } from '../App/constants';
import request from '../../utils/request';
import queryString from '../../utils/queryString';

const apiBaseUrl = getApiBaseUrl();

export default function queryHealthCareServicesWithLocationAssignmentData(organizationId, locationId, currentPage, status) {
  const params = queryString({
    statusList: status,
    assignedToLocationId: locationId,
    pageNumber: currentPage,
    pageSize: DEFAULT_PAGE_SIZE,
  });
  const url = `${apiBaseUrl}/organizations/${organizationId}/health-care-services${params}`;
  return request(url);
}

export function assignHealthCareServicesToLocation(orgId, locationIds, healthCareServiceId) {
  const params = queryString({
    organizationId: orgId,
    locationIdList: locationIds,
  });
  const url = `${apiBaseUrl}/health-care-services/${healthCareServiceId}/assign${params}`;
  return request(url);
}
