import { BASE_EPISODE_OF_CARES_API_URL,
  BASE_RELATED_PERSONS_API_URL,
  getEndpoint } from 'utils/endpointService';
import * as queryString from 'query-string';
import request from '../../utils/request';

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

export function getEpisodeOfCares(patientId) {
  const baseEndpointEpisodeOfCare = getEndpoint(BASE_EPISODE_OF_CARES_API_URL);
  const queryParams = { patient: patientId };
  const stringifiedParams = queryString.stringify(queryParams);
  const requestURL = `${baseEndpointEpisodeOfCare}?${stringifiedParams}`;
  return request(requestURL);
}
