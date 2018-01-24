import getApiBaseUrl from '../../apiBaseUrlConfig';
import request from '../../utils/request';

const apiBaseURL = getApiBaseUrl();

export default function postPatient(patientFormData) {
  const requestURL = `${apiBaseURL}/patients/`;
  return request(requestURL, {
    method: 'POST',
    body: JSON.stringify(patientFormData),
    headers: {
      'Content-Type': 'application/json',
    },
  });
}
