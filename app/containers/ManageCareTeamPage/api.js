import isEmpty from 'lodash/isEmpty';
import find from 'lodash/find';

export function getPatientById(patients, patientId) {
  if (!isEmpty(patients)) {
    return find(patients, { id: patientId });
  }
  return null;
}
