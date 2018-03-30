import { mapToAddresses, mapToIdentifiers, mapToName, mapToPhone } from 'containers/App/helpers';

export function flattenPatientData(patient) {
  return {
    ...patient,
    name: mapToName(patient.name),
    identifiers: mapToIdentifiers(patient.identifiers),
    addresses: mapToAddresses(patient.addresses),
    phones: mapToPhone(patient.telecoms),
    flags: patient.flags,
  };
}
