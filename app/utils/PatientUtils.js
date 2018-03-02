import { EMPTY_STRING } from 'containers/App/constants';

export function mapToPatientName(patient) {
  const names = patient.name;
  return names && names
    .map((name) => {
      const firstName = name.firstName !== EMPTY_STRING ? name.firstName : EMPTY_STRING;
      const lastName = name.lastName !== EMPTY_STRING ? name.lastName : EMPTY_STRING;
      return `${firstName} ${lastName}`;
    })
    .join(', ');
}
