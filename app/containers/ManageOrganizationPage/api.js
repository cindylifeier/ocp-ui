import getApiBaseUrl from '../../apiBaseUrlConfig';
import request from '../../utils/request';

const apiBaseUrl = getApiBaseUrl();

export default function createOrganizationApiCall(organizationFormData) {
  const requestUrl = `${apiBaseUrl}/organizations`;
  const body = JSON.stringify(mapToBackendOrganization(organizationFormData));
  return request(requestUrl, {
    method: 'POST',
    body,
    headers: {
      'Content-Type': 'application/json',
    },
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
