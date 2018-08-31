import * as queryString from 'query-string';
import request from 'utils/request';
import { BASE_APPOINTMENTS_API_URL, getEndpoint } from 'utils/endpointService';

export function getHealthcareService(organizationId) {
  const stringifiedParams = queryString.stringify({ resourceType: 'organization', resourceValue: organizationId });
  const appointmentBaseEndpoint = getEndpoint(BASE_APPOINTMENTS_API_URL);
  const requestURL = `${appointmentBaseEndpoint}/healthcare-service-references?${stringifiedParams}`;
  return request(requestURL);
}

export function getLocationReferences(healthcareServiceId) {
  const stringifiedParams = queryString.stringify({
    resourceType: 'healthcareservice',
    resourceValue: healthcareServiceId,
  });
  const appointmentBaseEndpoint = getEndpoint(BASE_APPOINTMENTS_API_URL);
  const requestURL = `${appointmentBaseEndpoint}/location-references?${stringifiedParams}`;
  return request(requestURL);
}

export function getPractitionerReferences(organizationId, locationId) {
  const stringifiedParams = queryString.stringify({ resourceType: 'location', resourceValue: locationId });
  const appointmentBaseEndpoint = getEndpoint(BASE_APPOINTMENTS_API_URL);
  const requestURL = `${appointmentBaseEndpoint}/practitioner-references?${stringifiedParams}`;
  return request(requestURL);
}
