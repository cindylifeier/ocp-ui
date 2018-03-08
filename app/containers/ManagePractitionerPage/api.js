import isEmpty from 'lodash/isEmpty';
import find from 'lodash/find';

import request from '../../utils/request';
import { BASE_PRACTITIONERS_API_URL, getEndpoint } from '../../utils/endpointService';

const baseEndpoint = getEndpoint(BASE_PRACTITIONERS_API_URL);

export function savePractitioner(practitionerFormData, roleLookup) {
  if (practitionerFormData.logicalId) {
    return updatePractitioner(practitionerFormData.logicalId, practitionerFormData, roleLookup);
  }
  return createPractitioner(practitionerFormData, roleLookup);
}

export function getPractitioner(logicalId) {
  const requestURL = `${baseEndpoint}/${logicalId}`;
  return request(requestURL);
}

export function getNotificationAction(practitionerFormData) {
  let action = 'create';
  if (practitionerFormData.logicalId) {
    action = 'edit';
  }
  return action;
}

export function getPractitionerById(practitioners, logicalId) {
  if (!isEmpty(practitioners)) {
    return find(practitioners, { logicalId });
  }
  return null;
}

function createPractitioner(practitionerFormData, roleLookup) {
  const requestURL = `${baseEndpoint}`;
  return request(requestURL, {
    method: 'POST',
    body: JSON.stringify(mapToBffPractitioner(practitionerFormData, roleLookup)),
    headers: {
      'Content-Type': 'application/json',
    },
  });
}

function updatePractitioner(logicalId, practitionerFormData, roleLookup) {
  const requestURL = `${baseEndpoint}/${logicalId}`;
  return request(requestURL, {
    method: 'PUT',
    body: JSON.stringify(mapToBffPractitioner(practitionerFormData, roleLookup)),
    headers: {
      'Content-Type': 'application/json',
    },
  });
}

function mapToBffPractitioner(practitionerData, roleLookup) {
  const {
    firstName, lastName, identifierType, identifierValue,
    address1, address2, city, state, postalCode, country, telecomType, telecomValue, practitionerRoles,
  } = practitionerData;

  const identifiers = [{
    system: identifierType,
    value: identifierValue,
  }];
  const name = [{
    firstName,
    lastName,
  }];
  const telecoms = [{
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

  const selectedPractitionerRole = practitionerRoles.map((pr) => {
    const { organization, code, specialty, active, logicalId } = pr;
    const selectedCode = [];
    selectedCode.push(find(roleLookup, { code }));
    const selectedSpecialty = [];
    selectedSpecialty.push(find(roleLookup, { code: specialty }));
    return ({
      organization,
      code: selectedCode,
      specialty: selectedSpecialty,
      active,
      logicalId });
  });

  return { identifiers, name, telecoms, address, practitionerRoles: selectedPractitionerRole };
}
