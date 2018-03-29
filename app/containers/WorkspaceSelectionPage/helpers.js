import { mapToIdentifiers } from 'containers/App/helpers';

export function flattenPatientData(patient) {
  return {
    ...patient,
    identifier: mapToIdentifiers(patient.identifier),
  };
}

