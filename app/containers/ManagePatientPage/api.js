import getApiBaseUrl from '../../apiBaseUrlConfig';
import request from '../../utils/request';

const apiBaseURL = getApiBaseUrl();

export default function postPatient(patientFormData) {
  const requestURL = `${apiBaseURL}/patients/`;
  return request(requestURL, {
    method: 'POST',
    body: JSON.stringify(mapToBackendPatient(patientFormData)),
    headers: {
      'Content-Type': 'application/json',
    },
  });
}

function mapToBackendPatient(patientFormData) {
  const {
    firstName, lastName, birthDate, genderCode, identifierType, identifierValue, language, race,
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
  return { identifier, name, telecom, address, birthDate, genderCode, language, race, ethnicity, birthSex };
}

