import isEmpty from 'lodash/isEmpty';
import find from 'lodash/find';

import request from '../../utils/request';
import getApiBaseUrl from '../../apiBaseUrlConfig';

const apiBaseURL = getApiBaseUrl();

export function savePractitioner(practitionerFormData) {
  if (practitionerFormData.logicalId) {
    return updatePractitioner(practitionerFormData.logicalId, practitionerFormData);
  }
  return createPractitioner(practitionerFormData);
}

export function getPractitioner(logicalId) {
  const requestURL = `${apiBaseURL}/practitioners/${logicalId}`;
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

function createPractitioner(practitionerFormData) {
  const requestURL = `${apiBaseURL}/practitioners`;
  return request(requestURL, {
    method: 'POST',
    body: JSON.stringify(mapToBffPractitioner(practitionerFormData)),
    headers: {
      'Content-Type': 'application/json',
    },
  });
}

function updatePractitioner(logicalId, practitionerFormData) {
  const requestURL = `${apiBaseURL}/practitioners/${logicalId}`;
  return request(requestURL, {
    method: 'PUT',
    body: JSON.stringify(mapToBffPractitioner(practitionerFormData)),
    headers: {
      'Content-Type': 'application/json',
    },
  });
}

function mapToBffPractitioner(practitionerData) {
  const {
    firstName, lastName, roleType, identifierType, identifierValue,
    address1, address2, city, state, postalCode, country, telecomType, telecomValue,
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
  const practitionerRoles = [{
    code: roleType,
  }];
  return { identifiers, name, telecoms, address, practitionerRoles };
}
