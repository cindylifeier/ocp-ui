/**
 * Helpers is a collection of useful common shared functions are used by OCP Domain containers
 *
 */
import isEmpty from 'lodash/isEmpty';
import upperFirst from 'lodash/upperFirst';
import identity from 'lodash/identity';

import { PHONE_SYSTEM } from 'utils/constants';
import {
  ADMIN_WORKSPACE,
  BENEFITS_SPECIALIST_ROLE_CODE,
  CARE_COORDINATOR_ROLE_CODE,
  CARE_MANAGER_ROLE_CODE,
  EMPTY_STRING,
  FRONT_OFFICE_ROLE_CODE,
  HEALTH_ASSISTANT_ROLE_CODE,
  NEW_LINE_CHARACTER,
  OCP_ADMIN_ROLE_CODE,
  ORGANIZATION_ADMIN_ROLE_CODE,
  PATIENT_ROLE_CODE,
  PATIENT_WORKSPACE,
  PCP_ROLE_CODE,
  PRACTITIONER_WORKSPACE,
} from 'containers/App/constants';

/**
 * Mapping Fhir resources
 * @returns {*}
 */

export function mapToName(nameArray) {
  let name;
  if (!isEmpty(nameArray)) {
    const [{ firstName, lastName }] = nameArray;
    name = [firstName, lastName].filter(identity).join(' ');
  }
  return name;
}

export function mapToIdentifiers(identifiers) {
  return identifiers && identifiers.map((identifier) => {
    const system = identifier.systemDisplay !== EMPTY_STRING ? identifier.systemDisplay : EMPTY_STRING;
    const value = identifier.value !== EMPTY_STRING ? identifier.value : EMPTY_STRING;
    return `${system}: ${value}`;
  }).join(NEW_LINE_CHARACTER);
}

export function mapToTelecoms(telecoms) {
  return telecoms && telecoms.map((telecom) => {
    const system = telecom.system !== EMPTY_STRING ? upperFirst(telecom.system) : EMPTY_STRING;
    const value = telecom.value !== EMPTY_STRING ? telecom.value : EMPTY_STRING;
    return `${system} ${value}`;
  }).join(NEW_LINE_CHARACTER);
}

export function mapToPhone(telecoms) {
  return telecoms && telecoms
    .filter((telecom) => telecom.system === PHONE_SYSTEM)
    .map((telecom) => telecom.value)
    .join(NEW_LINE_CHARACTER);
}

export function mapToAddresses(addresses) {
  return addresses && addresses
    .map((address) => combineAddress(address))
    .join(NEW_LINE_CHARACTER);
}

function combineAddress(address) {
  const addressStr = [];
  addressStr.push(address.line1 || '');
  addressStr.push(address.line2 || '');
  addressStr.push(address.city || '');
  addressStr.push(address.postalCode || '');
  addressStr.push(address.stateCode || '');
  addressStr.push(address.countryCode || '');
  return addressStr
    .filter((field) => field !== '')
    .join(', ');
}

export function getLinkUrlByRole(role) {
  let linkUrl;
  switch (role) {
    case OCP_ADMIN_ROLE_CODE:
      linkUrl = ADMIN_WORKSPACE;
      break;
    case PATIENT_ROLE_CODE:
      linkUrl = PATIENT_WORKSPACE;
      break;
    default:
      linkUrl = PRACTITIONER_WORKSPACE;
  }
  return linkUrl;
}

export function getPractitionerIdByRole(user) {
  let practitionerId;
  if (user && user.role && user.role !== OCP_ADMIN_ROLE_CODE && user.resource) {
    practitionerId = user ? user.resource.logicalId : null;
  }
  return practitionerId;
}

export function getRoleByScope(scope) {
  let role;
  switch (scope.split('.').pop(-1)) {
    case 'admin':
      role = OCP_ADMIN_ROLE_CODE;
      break;
    case 'patient':
      role = PATIENT_ROLE_CODE;
      break;
    case 'careCoordinator':
      role = CARE_COORDINATOR_ROLE_CODE;
      break;
    case 'careManager':
      role = CARE_MANAGER_ROLE_CODE;
      break;
    case 'orgAdmin':
      role = ORGANIZATION_ADMIN_ROLE_CODE;
      break;
    case 'pcp':
      role = PCP_ROLE_CODE;
      break;
    case 'benetspt':
      role = BENEFITS_SPECIALIST_ROLE_CODE;
      break;
    case 'hasst':
      role = HEALTH_ASSISTANT_ROLE_CODE;
      break;
    case 'forecept':
      role = FRONT_OFFICE_ROLE_CODE;
      break;
    default:
      role = null;
  }
  return role;
}
