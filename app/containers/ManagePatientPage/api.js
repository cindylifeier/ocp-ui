import getApiBaseUrl from '../../apiBaseUrlConfig';
import request from '../../utils/request';
import { EMPTY_STRING } from '../App/constants';

const apiBaseURL = getApiBaseUrl();

export function postPatient(patientFormData) {
  const requestURL = `${apiBaseURL}/patients/`;
  return request(requestURL, {
    method: 'POST',
    body: JSON.stringify(mapToBackendPatient(patientFormData)),
    headers: {
      'Content-Type': 'application/json',
    },
  });
}

export function putPatient(patientFormData) {
  const requestURL = `${apiBaseURL}/patients/`;
  return request(requestURL, {
    method: 'PUT',
    body: JSON.stringify(mapToBackendPatient(patientFormData)),
    headers: {
      'Content-Type': 'application/json',
    },
  });
}

export function mapToPatientName(patient) {
  const names = patient.name;
  return names && names
    .map((name) => {
      const firstName = name.firstName !== EMPTY_STRING ? name.firstName : EMPTY_STRING;
      const lastName = name.lastName !== EMPTY_STRING ? name.lastName : EMPTY_STRING;
      return `${firstName} ${lastName}`;
    })
    .join(', ');
}

function mapToBackendPatient(patientFormData) {
  const {
    id, firstName, lastName, birthDate, genderCode, identifierType, identifierValue, language, race,
    ethnicity, birthSex, address1, address2, city, state, postalCode, country, telecomType, telecomValue,
  } = patientFormData;

  const identifier = [{
    system: identifierType,
    value: identifierValue,
  }];
  const name = [{
    firstName,
    lastName,
  }];
  const telecom = [{
    system: telecomType,
    value: telecomValue,
  }];
  const address = [{
    line1: address1,
    line2: address2,
    city,
    stateCode: state,
    postalCode,
    countryCode: country,
  }];
  const gender = genderCode;
  return {
    id,
    identifier,
    name,
    telecom,
    address,
    birthDate,
    genderCode: gender,
    language,
    race,
    ethnicity,
    birthSex,
    active: true,
  };
}

export function mapToFrontendPatientForm(patientData) {
  const {
    id, identifier, name, telecom, address, birthDate, genderCode, language, race, ethnicity, birthSex,
  } = patientData;

  const identifierType = identifier[0].system;
  const identifierValue = identifier[0].value;
  const firstName = name[0].firstName;
  const lastName = name[0].lastName;
  const telecomType = telecom.length > 0 ? telecom[0].system : null;
  const telecomValue = telecom.length > 0 ? telecom[0].value : null;
  const address1 = address.length > 0 ? address[0].line1 : null;
  const address2 = address.length > 0 ? address[0].line2 : null;
  const city = address.length > 0 ? address[0].city : null;
  const state = address.length > 0 ? address[0].stateCode : null;
  const postalCode = address.length > 0 ? address[0].postalCode : EMPTY_STRING;
  const country = address.length > 0 ? address[0].countryCode : null;
  const dob = (birthDate !== undefined && birthDate !== null) ? new Date(birthDate) : null;
  const gender = (genderCode !== undefined && genderCode !== null) ? genderCode.toLowerCase() : null;
  const teleType = (telecomType !== undefined && telecomType !== null) ? telecomType.toLowerCase() : null;

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
    address1,
    address2,
    city,
    state,
    postalCode,
    country,
    telecomType: teleType,
    telecomValue,
  };
}

