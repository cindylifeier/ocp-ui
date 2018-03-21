import { mapToAddresses, mapToIdentifiers, mapToTelecoms } from 'containers/App/helpers';

export function flattenOrganizationData(organizations) {
  return organizations && organizations.map((organization) => ({
    ...organization,
    telecoms: mapToTelecoms(organization.telecoms),
    identifiers: mapToIdentifiers(organization.identifiers),
    addresses: mapToAddresses(organization.addresses),
  }));
}
