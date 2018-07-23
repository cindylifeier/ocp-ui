import { DEFAULT_PAGE_SIZE } from '../App/constants';
import queryString from '../../utils/queryString';
import request from '../../utils/request';
import { BASE_ORGANIZATIONS_API_URL, getEndpoint } from '../../utils/endpointService';

export function getLocationWithPractitionerAssignmentData(organizationId, locationId, currentPage) {
  const params = queryString({
    assignedToLocationId: locationId,
    pageNumber: currentPage,
    pageSize: DEFAULT_PAGE_SIZE,
  });
  const baseEndpoint = getEndpoint(BASE_ORGANIZATIONS_API_URL);
  const url = `${baseEndpoint}/${organizationId}/locations${params}`;
  return request(url);
}
