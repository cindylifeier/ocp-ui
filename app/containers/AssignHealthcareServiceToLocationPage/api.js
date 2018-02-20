import { DEFAULT_PAGE_SIZE } from '../App/constants';
import queryString from '../../utils/queryString';
import request from '../../utils/request';
import { BASE_HEALTHCARE_SERVICES_API_URL, BASE_ORGANIZATIONS_API_URL, getEndpoint } from '../../utils/endpointService';

export function queryHealthCareServicesWithLocationAssignmentData(organizationId, locationId, currentPage, status) {
  const params = queryString({
    statusList: status,
    assignedToLocationId: locationId,
    pageNumber: currentPage,
    pageSize: DEFAULT_PAGE_SIZE,
  });
  const requestEndpoint = getEndpoint(BASE_ORGANIZATIONS_API_URL);
  const url = `${requestEndpoint.url}/${organizationId}/healthcare-services${params}`;
  return request(url, requestEndpoint.isSecured);
}

export function assignHealthCareServicesToLocation(orgId, locationIds, healthCareServiceId) {
  const params = queryString({
    organizationId: orgId,
    locationIdList: locationIds,
  });
  const requestEndpoint = getEndpoint(BASE_HEALTHCARE_SERVICES_API_URL);
  const url = `${requestEndpoint.url}/${healthCareServiceId}/assign${params}`;
  return request(url, requestEndpoint.isSecured, {
    method: 'PUT',
    headers: {
      'Content-Type': 'application/json',
    },
  });
}
