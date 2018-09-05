import find from 'lodash/find';
import has from 'lodash/has';
import Util from 'utils/Util';

export function checkFieldSelected(formValues, fieldName) {
  return !has(formValues, fieldName);
}

export function mapToParticipantReference(participant, participantReferences) {
  return participant && find(participantReferences, (participantReference) => Util.equalsIgnoreCase(participantReference.reference, participant));
}

export function mapToPractitionerParticipantReference(practitioner, attendance, practitionerReferences, attendanceReferences) {
  const practitionerReference = mapToParticipantReference(practitioner, practitionerReferences);
  const attendanceReference = find(attendanceReferences, (attendanceRef) => Util.equalsIgnoreCase(attendanceRef.code, attendance));
  if (attendanceReference) {
    return {
      ...practitionerReference,
      participantRequiredCode: attendanceReference.code,
      participantRequiredDisplay: attendanceReference.display,
      participantRequiredSystem: attendanceReference.system,
    };
  }
  return {
    ...practitionerReference,
  };
}
