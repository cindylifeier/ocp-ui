
import isEmpty from 'lodash/isEmpty';
import request from '../../utils/request';
import getApiBaseUrl from '../../apiBaseUrlConfig';

const apiBaseURL = getApiBaseUrl();

export function fetchLookups(lookupTypes) {
  const lookupKeyList = lookupTypes.join();
  const requestURL = `${apiBaseURL}/lookups?lookUpTypeList=${lookupKeyList}`;
  return request(requestURL);
}

export function getPatientById(patients, patientId) {
  if (!isEmpty(patients)) {
    return find(patients, { id: patientId });
  }
  return null;
}

export function getPatient(patientId) {
  const requestURL = `${apiBaseURL}/patients/${patientId}`;
  return request(requestURL);
}
