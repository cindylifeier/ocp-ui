import request from 'utils/request';
import { BASE_SMART_URL, getEndpoint } from 'utils/endpointService';

const baseEndpoint = getEndpoint(BASE_SMART_URL);

export function saveClient(clientFormData) {
  const requestURL = `${baseEndpoint}/clients`;
  return request(requestURL, {
    method: 'POST',
    body: JSON.stringify(clientFormData),
    headers: {
      'Content-Type': 'application/json',
    },
  });
}
