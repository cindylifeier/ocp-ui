import request from '../../utils/request';
import { BASE_RELATED_PERSONS_API_URL, getEndpoint } from '../../utils/endpointService';

const baseEndpoint = getEndpoint(BASE_RELATED_PERSONS_API_URL);

export function createCommunication(communication) {
  const requestURL = `${baseEndpoint}`;
  return request(requestURL, {
    method: 'POST',
    body: JSON.stringify(communication),
    headers: {
      'Content-Type': 'application/json',
    },
  });
}

export function updateCommunication(communication) {
  const communicationId = communication.communicationId;
  const requestURL = `${baseEndpoint}/${communicationId}`;
  return request(requestURL, {
    method: 'PUT',
    body: JSON.stringify(communication),
    headers: {
      'Content-Type': 'application/json',
    },
  });
}
