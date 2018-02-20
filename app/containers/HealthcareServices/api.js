import { DEFAULT_PAGE_SIZE } from '../App/constants';
import request from '../../utils/request';
import queryString from '../../utils/queryString';
import { BASE_ORGANIZATIONS_API_URL, getEndpoint } from '../../utils/endpointService';

const baseEndpoint = getEndpoint(BASE_ORGANIZATIONS_API_URL);

export function getHealthcareServicesByOrganization(organizationId, status, currentPage) {
  const params = queryString({
    statusList: status,
    pageNumber: currentPage,
    pageSize: DEFAULT_PAGE_SIZE,
  });
  const url = `${baseEndpoint.url}/${organizationId}/healthcare-services${params}`;
  return request(url, baseEndpoint.isSecured);
}

export function getHealthcareServicesByLocation(organizationId, locationId, status, currentPage) {
  const params = queryString({
    statusList: status,
    pageNumber: currentPage,
    pageSize: DEFAULT_PAGE_SIZE,
  });
  const url = `${baseEndpoint.url}/${organizationId}/locations/${locationId}/healthcare-services${params}`;
  return request(url, baseEndpoint.isSecured);
}
