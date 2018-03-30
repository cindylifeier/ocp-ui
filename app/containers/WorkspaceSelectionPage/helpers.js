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

