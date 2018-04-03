import { isEmpty } from 'lodash';
import find from 'lodash/find';
import isUndefined from 'lodash/isUndefined';
import { BASE_APPOINTMENTS_API_URL, getEndpoint } from 'utils/endpointService';
import request from 'utils/request';

const baseEndpoint = getEndpoint(BASE_APPOINTMENTS_API_URL);
const headers = {
  'Content-Type': 'application/json',
};

export function saveAppointment(appointmentFormData) {
  if (appointmentFormData.appointmentId) {
    return updateAppointment(appointmentFormData);
  }
  return createAppointment(appointmentFormData);
}

export function getAppointmentApi(appointmentId) {
  const requestURL = `${baseEndpoint}/${appointmentId}`;
  return request(requestURL);
}

export function getAppointmentById(appointments, appointmentId) {
  if (!isEmpty(appointments)) {
    return find(appointments, { logicalId: appointmentId });
  }
  return null;
}

export function createAppointment(appointmentFormData) {
  const requestUrl = `${baseEndpoint}`;
  const body = JSON.stringify(mapToBackendAppointmentDuringCreate(appointmentFormData));
  return request(requestUrl, {
    method: 'POST',
    headers,
    body,
  });
}

function updateAppointment(appointmentFormData) {
  const appointmentId = appointmentFormData.appointmentId;
  const requestURL = `${baseEndpoint}/${appointmentId}`;
  return request(requestURL, {
    method: 'PUT',
    body: JSON.stringify(mapToBackendAppointmentDuringUpdate(appointmentFormData)),
    headers: {
      'Content-Type': 'application/json',
    },
  });
}

function mapToBackendAppointmentDuringCreate(appointmentFormData) {
  const { appointmentType, date, description, startTime, endTime, participants, patientId, patientName, practitionerId, practitionerName } = appointmentFormData;
  const appointmentDataToSubmit = {};
  if (!isUndefined(description)) {
    appointmentDataToSubmit.description = description;
  }
  if (!isUndefined(appointmentType)) {
    appointmentDataToSubmit.typeCode = appointmentType;
  }
  let appointmentDateString;
  let utcHours;
  let utcMinutes;
  if (!isUndefined(date)) {
    const selectedDate = new Date(date);
    const year = selectedDate.getFullYear();
    // Note: 0=January, 1=February etc.
    const month = toDoubleChars(selectedDate.getMonth() + 1);
    const day = toDoubleChars(selectedDate.getDate());
    appointmentDateString = `${year}-${month}-${day}`;
  }
  if (!isUndefined(date) && !isUndefined(startTime)) {
    utcHours = toDoubleChars(new Date(startTime).getUTCHours());
    utcMinutes = toDoubleChars(new Date(startTime).getUTCMinutes());
    appointmentDataToSubmit.start = `${appointmentDateString}T${utcHours}:${utcMinutes}:00.00`;
  }
  if (!isUndefined(date) && !isUndefined(endTime)) {
    utcHours = toDoubleChars(new Date(endTime).getUTCHours());
    utcMinutes = toDoubleChars(new Date(endTime).getUTCMinutes());
    appointmentDataToSubmit.end = `${appointmentDateString}T${utcHours}:${utcMinutes}:00.00`;
  }
  appointmentDataToSubmit.creatorReference = `Practitioner/${practitionerId}`;
  appointmentDataToSubmit.creatorName = practitionerName;

  const patientParticipant = [];
  const patientReference = `Patient/${patientId}`;
  patientParticipant.push({
    actorReference: patientReference,
    actorName: patientName,
  });
  appointmentDataToSubmit.participant = patientParticipant;

  // Participants
  if (!isUndefined(participants) && !isEmpty(participants)) {
    const otherParticipants = mapToBffParticipants(participants);
    otherParticipants.map((participant) => appointmentDataToSubmit.participant.push(participant));
  }
  return appointmentDataToSubmit;
}

function mapToBffParticipants(participants) {
  if (!isEmpty(participants)) {
    return participants
      .map((participant) => ({
        participationTypeCode: participant.participationType.code,
        participantRequiredCode: participant.required.code,
        participationStatusCode: participant.status.code,
        actorReference: `${participant.memberType}/${participant.memberId}`,
        actorName: participant.name,
      }));
  }
  return [];
}

export function mapToEditParticipants(participants) {
  if (!isEmpty(participants)) {
    return participants
      .map((participant) => ({
        participationTypeCode: participant.participationTypeCode,
        participantRequiredCode: participant.participantRequiredCode,
        participationStatusCode: participant.participationStatusCode,
        actorReference: participant.actorReference,
        actorName: participant.actorName,
      }));
  }
  return [];
}


function mapToBackendAppointmentDuringUpdate(appointmentFormData) {
  // TODO: When edit appointment is implemented
  return appointmentFormData;
}

function toDoubleChars(number) {
  if (number < 10) {
    return `0${number}`;
  }
  return number;
}

