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
  // TODO: Handle UI hard-coded data
  const status = 'draft';
  const category = [{
    code: '59284-0',
    display: 'Patient Consent',
  }];
  const {
    consentFromActors, consentToActors, medicalInformation, consentStart, consentEnd, consentType,
  } = consentFormData;

  const fromActor = consentFromActors
    .map((actor) => ({
      reference: `${actor.reference.type}/${actor.reference.logicalId}`,
      display: actor.display,
    }));

  const toActor = consentToActors
    .map((actor) => ({
      reference: `${actor.reference.type}/${actor.reference.logicalId}`,
      display: actor.display,
    }));

  const patientReference = {
    reference: `Patient/${patient.id}`,
    display: mapToName(patient.name),
  };

  const period = {
    start: Util.formatDate(consentStart),
    end: Util.formatDate(consentEnd),
  };

  let consentData = {
    status,
    category,
    period,
    generalDesignation: consentType,
    patient: patientReference,
    fromActor,
    toActor,
    medicalInformation,
  };

  // If generalDesignation is true, create general consent
  if (consentType) {
    consentData = {
      status,
      category,
      period,
      generalDesignation: consentType,
      patient: patientReference,
    };
  }
  return consentData;
}
