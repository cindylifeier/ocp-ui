import { mapToPatientName } from 'utils/PatientUtils';

export function flattenPatientsData(patients) {
  return patients && patients.map((patient) => ({
    ...patient,
    name: mapToPatientName(patient),
  }));
}

