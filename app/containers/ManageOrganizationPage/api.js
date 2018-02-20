import request from '../../utils/request';
import { BASE_ORGANIZATIONS_API_URL, getEndpoint } from '../../utils/endpointService';

const baseEndpoint = getEndpoint(BASE_ORGANIZATIONS_API_URL);
const headers = {
  'Content-Type': 'application/json',
};

export function createOrganizationApiCall(organizationFormData) {
  const requestUrl = `${baseEndpoint.url}`;
  const body = JSON.stringify(mapToBackendOrganization(organizationFormData));
  return request(requestUrl, baseEndpoint.isSecured, {
    method: 'POST',
    headers,
    body,
  });
}

export function updateOrganizationApiCall(id, organizationFormData) {
  const requestUrl = `${baseEndpoint.url}/${id}`;
  const body = JSON.stringify(mapToBackendOrganization(organizationFormData));
  return request(requestUrl, baseEndpoint.isSecured, {
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
