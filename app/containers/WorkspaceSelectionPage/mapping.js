import { mapToPatientName } from 'utils/PatientUtils';

export function flattenPatientData(patients) {
  return patients && patients.map((patient) => ({
    ...patient,
    name: mapToPatientName(patient),
  }));
}

