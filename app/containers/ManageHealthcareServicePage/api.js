import isEmpty from 'lodash/isEmpty';
import find from 'lodash/find';
import request from '../../utils/request';
import getApiBaseUrl from '../../apiBaseUrlConfig';

const apiBaseUrl = getApiBaseUrl();

export function createHealthcareService(healthcareServiceFormData, organizationId) {
  const url = `${apiBaseUrl}/organization/${organizationId}/healthcare-service`;
  return request(url, {
    method: 'POST',
    body: JSON.stringify(healthcareServiceFormData),
    headers: {
      'Content-Type': 'application/json',
    },
  });
}

export function editHealthcareService(healthcareServiceFormData, organizationId) {
  const url = `${apiBaseUrl}/organization/${organizationId}/healthcare-service/${healthcareServiceFormData.logicalId}`;
  return request(url, {
    method: 'PUT',
    body: JSON.stringify(healthcareServiceFormData),
    headers: {
      'Content-Type': 'application/json',
    },
  });
}

export function getHealthcareServiceByIdFromStore(healthcareServices, logicalId) {
  if (!isEmpty(healthcareServices)) {
    return find(healthcareServices, { logicalId });
  }
  return null;
}

export function getHealthcareServiceById(logicalId) {
  const requestURL = `${apiBaseUrl}/healthcare-service/${logicalId}`;
  return request(requestURL);
}
