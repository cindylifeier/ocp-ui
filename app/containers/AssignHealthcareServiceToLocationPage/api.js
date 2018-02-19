import getApiBaseUrl from '../../apiBaseUrlConfig';
import { DEFAULT_PAGE_SIZE } from '../App/constants';
import queryString from '../../utils/queryString';
import { requestWithJWT } from '../../utils/request';

const apiBaseUrl = getApiBaseUrl();

export function queryHealthCareServicesWithLocationAssignmentData(organizationId, locationId, currentPage, status) {
  const params = queryString({
    statusList: status,
    assignedToLocationId: locationId,
    pageNumber: currentPage,
    pageSize: DEFAULT_PAGE_SIZE,
  });
  const url = `${apiBaseUrl}/organizations/${organizationId}/healthcare-services${params}`;
  return requestWithJWT(url);
}

export function assignHealthCareServicesToLocation(orgId, locationIds, healthCareServiceId) {
  const params = queryString({
    organizationId: orgId,
    locationIdList: locationIds,
  });
  const url = `${apiBaseUrl}/healthcare-services/${healthCareServiceId}/assign${params}`;
  return requestWithJWT(url, {
    method: 'PUT',
    headers: {
      'Content-Type': 'application/json',
    },
  });
}
