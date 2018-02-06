import getApiBaseUrl from '../../apiBaseUrlConfig';
import { DEFAULT_PAGE_SIZE } from '../App/constants';
import request from '../../utils/request';
import queryString from '../../utils/queryString';

const apiBaseUrl = getApiBaseUrl();

export default function queryHealthCareServicesWithLocationAssignmentData(organizationId, locationId, currentPage) {
  const params = queryString({
    assignedToLocationId: locationId,
    pageNumber: currentPage,
    pageSize: DEFAULT_PAGE_SIZE,
  });
  const url = `${apiBaseUrl}/organizations/${organizationId}/health-care-services${params}`;
  return request(url);
}
