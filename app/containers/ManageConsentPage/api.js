import flattenDeep from 'lodash/flattenDeep';

import request from 'utils/request';
import { BASE_CONSENTS_API_URL, getEndpoint } from 'utils/endpointService';
import Util from 'utils/Util';
import { mapToName } from 'containers/App/helpers';


export function saveConsent(consentFormData, patient) {
  return createConsent(consentFormData, patient);
}

export function getErrorDetail(err) {
  let errorDetail = '';
  if (err && err.message === 'Failed to fetch') {
    errorDetail = ' Server is offline.';
  } else if (err && err.response && err.response.status === 409) {
    errorDetail = ' Duplicate Entry:: Consent already exists.';
  } else if (err && err.response && err.response.status === 412) {
    errorDetail = 'Precondition Failed:: No care team members.';
  } else if (err && err.response && err.response.status === 500) {
    errorDetail = ' Unknown server error.';
  }
  return errorDetail;
}

function createConsent(consentFormData, patient) {
  const baseEndpoint = getEndpoint(BASE_CONSENTS_API_URL);
  const requestURL = `${baseEndpoint}`;
  return request(requestURL, {
    method: 'POST',
    body: JSON.stringify(mapToBffConsentDto(consentFormData, patient)),
    headers: {
      'Content-Type': 'application/json',
    },
  });
}

function mapToBffConsentDto(consentFormData, patient) {
  const {
    consentFromActors, consentStart, consentEnd, consentType,
  } = consentFormData;

  const patientReference = {
    reference: `Patient/${patient.id}`,
    display: mapToName(patient.name),
  };

  const period = {
    start: Util.formatDate(consentStart),
    end: Util.formatDate(consentEnd),
  };

  return {
    period,
    patient: patientReference,
    fromActor: flattenDeep(consentFromActors),
    generalDesignation: consentType,
  };
}
