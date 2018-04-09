import request from 'utils/request';
import { BASE_CONSENTS_API_URL, getEndpoint } from 'utils/endpointService';

export function createConsent(consentFormData) {
  const baseEndpoint = getEndpoint(BASE_CONSENTS_API_URL);
  const requestURL = `${baseEndpoint}`;
  return request(requestURL, {
    method: 'POST',
    body: JSON.stringify(consentFormData),
    headers: {
      'Content-Type': 'application/json',
    },
  });
}
