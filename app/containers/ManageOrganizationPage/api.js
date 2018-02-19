import getApiBaseUrl from '../../apiBaseUrlConfig';
import { requestWithJWT } from '../../utils/request';

const apiBaseUrl = getApiBaseUrl();
const headers = {
  'Content-Type': 'application/json',
};

export function createOrganizationApiCall(organizationFormData) {
  const requestUrl = `${apiBaseUrl}/organizations`;
  const body = JSON.stringify(mapToBackendOrganization(organizationFormData));
  return requestWithJWT(requestUrl, {
    method: 'POST',
    headers,
    body,
  });
}

export function updateOrganizationApiCall(id, organizationFormData) {
  const requestUrl = `${apiBaseUrl}/organizations/${id}`;
  const body = JSON.stringify(mapToBackendOrganization(organizationFormData));
  return requestWithJWT(requestUrl, {
    method: 'PUT',
    headers,
    body,
  });
}

function mapToBackendOrganization(organizationFormData) {
  const { name, identifierSystem, identifierValue, status, line1, line2, city, stateCode, postalCode, telecomSystem, telecomValue } = organizationFormData;
  const active = status === 'true';
  const address = {
    line1,
    line2,
    city,
    stateCode,
    postalCode,
  };
  const addresses = [address];
  const telecom = {
    system: telecomSystem,
    value: telecomValue,
  };
  const telecoms = [telecom];
  const identifier = {
    system: identifierSystem,
    value: identifierValue,
  };
  const identifiers = [identifier];
  return {
    name,
    active,
    addresses,
    telecoms,
    identifiers,
  };
}
