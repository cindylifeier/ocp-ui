import request from '../../utils/request';
import { getEndpoint, LOOKUPS_API_URL } from '../../utils/endpointService';

const baseEndpoint = getEndpoint(LOOKUPS_API_URL);

export function postRelatedPerson(relatedPerson) {
  const requestURL = `${baseEndpoint}/related-persons/`;
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
  const requestURL = `${baseEndpoint}/related-persons/${relatedPersonId}`;
  return request(requestURL, {
    method: 'PUT',
    body: JSON.stringify(relatedPerson),
    headers: {
      'Content-Type': 'application/json',
    },
  });
}
