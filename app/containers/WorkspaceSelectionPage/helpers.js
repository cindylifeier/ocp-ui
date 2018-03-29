import { mapToIdentifiers, mapToName } from 'containers/App/helpers';

export function flattenPatientData(patient) {
  return {
    ...patient,
    name: mapToName(patient.name),
    identifier: mapToIdentifiers(patient.identifier),
  };
}

