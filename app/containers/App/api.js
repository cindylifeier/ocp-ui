
import isEmpty from 'lodash/isEmpty';
import request from '../../utils/request';
import { getEndpoint, LOOKUPS_API_URL } from '../../utils/endpointService';

export function fetchLookups(lookupTypes) {
  const baseEndpoint = getEndpoint(LOOKUPS_API_URL);
  const lookupKeyList = lookupTypes.join();
  const requestURL = `${baseEndpoint}?lookUpTypeList=${lookupKeyList}`;
  return request(requestURL);
}

export function getPatientById(patients, patientId) {
  if (!isEmpty(patients)) {
    return find(patients, { id: patientId });
  }
  return null;
}

export function getPatient(patientId) {
  const baseEndpoint = getEndpoint(LOOKUPS_API_URL);
  const requestURL = `${baseEndpoint}/patients/${patientId}`;
  return request(requestURL);
}
