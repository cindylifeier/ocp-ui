/**
 * Helpers is a collection of useful common shared functions are used by OCP Domain containers
 *
 */

import {
  ADMIN_WORKSPACE,
  CARE_COORDINATOR_ROLE_VALUE,
  CARE_MANAGER_ROLE_VALUE,
  EMPTY_STRING,
  OCP_ADMIN_ROLE_VALUE,
  PATIENT_ROLE_VALUE,
  PATIENT_WORKSPACE,
  PRACTITIONER_WORKSPACE,
  WORKSPACE_SELECTION_URL,
} from 'containers/App/constants';
import upperFirst from 'lodash/upperFirst';

/**
 * Mapping Fhir resource
 * @returns {*}
 * @param identifiers
 */
export function mapToIdentifiers(identifiers) {
  return identifiers && identifiers.map((identifier) => {
    const system = identifier.systemDisplay !== EMPTY_STRING ? identifier.systemDisplay : EMPTY_STRING;
    const value = identifier.value !== EMPTY_STRING ? identifier.value : EMPTY_STRING;
    return `${system} ${value}`;
  }).join(', ');
}

export function mapToTelecoms(telecoms) {
  return telecoms && telecoms.map((telecom) => {
    const system = telecom.system !== EMPTY_STRING ? upperFirst(telecom.system) : EMPTY_STRING;
    const value = telecom.value !== EMPTY_STRING ? telecom.value : EMPTY_STRING;
    return `${system} ${value}`;
  }).join(', ');
}

export function mapToAddresses(addresses) {
  return addresses && addresses
    .map((address) => combineAddress(address))
    .join(', ');
}

function combineAddress(address) {
  const addressStr = [];
  addressStr.push(address.line1 || '');
  addressStr.push(address.line2 || '');
  addressStr.push(address.city || '');
  addressStr.push(address.postalCode || '');
  addressStr.push(address.stateCode || '');
  addressStr.push(address.countryCode || '');
  return addressStr.filter((field) => field !== '');
}

export function getLinkUrlByRole(role) {
  let linkUrl;
  switch (role) {
    case OCP_ADMIN_ROLE_VALUE:
      linkUrl = ADMIN_WORKSPACE;
      break;
    case CARE_MANAGER_ROLE_VALUE:
      linkUrl = PRACTITIONER_WORKSPACE;
      break;
    case CARE_COORDINATOR_ROLE_VALUE:
      linkUrl = PRACTITIONER_WORKSPACE;
      break;
    case PATIENT_ROLE_VALUE:
      linkUrl = PATIENT_WORKSPACE;
      break;
    default:
      linkUrl = WORKSPACE_SELECTION_URL;
  }
  return linkUrl;
}
