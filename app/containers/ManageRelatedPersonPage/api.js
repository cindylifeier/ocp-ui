import getApiBaseUrl from '../../apiBaseUrlConfig';
import request from '../../utils/request';

const apiBaseURL = getApiBaseUrl();

export function postRelatedPerson(relatedPerson) {
  const requestURL = `${apiBaseURL}/related-persons/`;
  return request(requestURL, {
    method: 'POST',
    body: JSON.stringify(relatedPerson),
    headers: {
      'Content-Type': 'application/json',
    },
  });
}

export function putRelatedPerson(relatedPerson) {
  const relatedPersonId = relatedPerson.relatedPersonId;
  const requestURL = `${apiBaseURL}/related-persons/${relatedPersonId}`;
  return request(requestURL, {
    method: 'PUT',
    body: JSON.stringify(relatedPerson),
    headers: {
      'Content-Type': 'application/json',
    },
  });
}
