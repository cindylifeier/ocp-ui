import request from 'utils/request';
import { BASE_PATIENTS_API_URL, getEndpoint } from 'utils/endpointService';
import Util from 'utils/Util';

const baseEndpoint = getEndpoint(BASE_PATIENTS_API_URL);

export function postPatient(patientFormData) {
  const requestURL = `${baseEndpoint}`;
  return request(requestURL, {
    method: 'POST',
    body: JSON.stringify(mapToBackendPatient(patientFormData)),
    headers: {
      'Content-Type': 'application/json',
    },
  });
}

export function putPatient(patientFormData) {
  const requestURL = `${baseEndpoint}`;
  return request(requestURL, {
    method: 'PUT',
    body: JSON.stringify(mapToBackendPatient(patientFormData)),
    headers: {
      'Content-Type': 'application/json',
    },
  });
}

export function getPatient(patientId) {
  const requestURL = `${baseEndpoint}/${patientId}`;
  return request(requestURL);
}

function mapToBackendPatient(patientFormData) {
  const {
    id, firstName, lastName, birthDate, genderCode, identifierType, identifierValue, language, race,
    ethnicity, birthSex, addresses, telecoms, flags,
  } = patientFormData;


  const identifier = [{
    system: identifierType,
    value: identifierValue,
  }];
  const name = [{
    firstName,
    lastName,
  }];
  const mappedFlags = mapToBackendFlags(flags);
  return {
    id,
    identifier,
    name,
    telecoms,
    addresses,
    birthDate: Util.formatDate(birthDate),
    genderCode,
    language,
    race,
    ethnicity,
    birthSex,
    flags: mappedFlags,
    active: true,
  };
}

function mapToBackendFlags(flags) {
  return flags.map((flag) => {
    const { status, category, logicalId, code, flagStart, flagEnd } = flag;
    return { status, category, logicalId, code, period: { start: Util.formatDate(flagStart), end: Util.formatDate(flagEnd) }, author: { display: 'HealthCare Officer', reference: 'Practitioner/1557' } };
  });
}

export function mapToFrontendPatientForm(patientData) {
  const {
    id, identifier, name, telecoms, addresses, birthDate, genderCode, language, race, ethnicity, birthSex, flags,
  } = patientData;

  const identifierType = identifier[0].system;
  const identifierValue = identifier[0].value;
  const firstName = name[0].firstName;
  const lastName = name[0].lastName;
  const dob = (birthDate !== undefined && birthDate !== null) ? new Date(birthDate) : null;
  const gender = (genderCode !== undefined && genderCode !== null) ? genderCode.toLowerCase() : null;
  const mappedFlags = mapToFrontendFlags(flags);
  return {
    id,
    firstName,
    lastName,
    birthDate: dob,
    genderCode: gender,
    identifierType,
    identifierValue,
    language,
    race,
    ethnicity,
    birthSex,
    addresses,
    telecoms,
    flags: mappedFlags,
  };
}

function mapToFrontendFlags(flags) {
  return flags.map((flag) => {
    const { status, category, logicalId, code, period, author } = flag;
    return { status, category, logicalId, code, flagStart: new Date(period.start), flagEnd: new Date(period.end), author };
  });
}
