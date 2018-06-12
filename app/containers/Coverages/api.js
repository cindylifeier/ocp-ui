import request from '../../utils/request';
import {
  BASE_COVERAGE_URL,
  BASE_PATIENTS_API_URL,
  getEndpoint,
} from '../../utils/endpointService';

const baseEndpoint = getEndpoint(BASE_COVERAGE_URL);

export function saveCoverage(coverageData) {
  const requestURL = `${baseEndpoint}`;
  return request(requestURL, {
    method: 'POST',
    body: JSON.stringify(coverageData),
    headers: {
      'Content-Type': 'application/json',
    },
  });
}

export function getSubscriberOptions(patientId) {
  const patientBaseEndpoint = getEndpoint(BASE_PATIENTS_API_URL);
  const requestURL = `${patientBaseEndpoint}/${patientId}/subscriber-options`;
  return request(requestURL);
}
