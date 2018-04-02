import find from 'lodash/find';
import { mapToAddresses, mapToIdentifiers, mapToName, mapToTelecoms } from 'containers/App/helpers';

export function flattenPatientData(patient) {
  return {
    ...patient,
    name: mapToName(patient.name),
    identifier: mapToIdentifiers(patient.identifier),
  };
}

export function flattenOrganizationData(organization) {
  return {
    ...organization,
    telecoms: mapToTelecoms(organization.telecoms),
    identifiers: mapToIdentifiers(organization.identifiers),
    addresses: mapToAddresses(organization.addresses),
  };
}

export function mapToRoleObject(userRoles, roleValue) {
  const valueKey = 'value';
  return find(userRoles, [valueKey, roleValue]);
}

