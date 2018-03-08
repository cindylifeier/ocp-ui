import isEmpty from 'lodash/isEmpty';

export function getPatientName(patient) {
  const name = !isEmpty(patient) && !isEmpty(patient.name) ? (patient.name) : '';
  const fullName = name.length > 0 ? (name[0].firstName.concat(' ').concat(name[0].lastName)) : '';
  return fullName;
}
