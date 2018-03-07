import { BASE_APPOINTMENTS_API_URL, getEndpoint } from 'utils/endpointService';
import request from '../../utils/request';

const baseEndpoint = getEndpoint(BASE_APPOINTMENTS_API_URL);
const headers = {
  'Content-Type': 'application/json',
};

export function saveAppointment(appointmentFormData) {
  if (appointmentFormData.appointmentId) {
    return updateAppointmentApiCall(appointmentFormData);
  }
  return createAppointmentApiCall(appointmentFormData);
}

export function createAppointmentApiCall(appointmentFormData) {
  const requestUrl = `${baseEndpoint}`;
  const body = JSON.stringify(mapToBackendAppointment(appointmentFormData));
  return request(requestUrl, {
    method: 'POST',
    headers,
    body,
  });
}

function updateAppointmentApiCall(appointmentFormData) {
  const appointmentId = appointmentFormData.appointmentId;
  const requestURL = `${baseEndpoint}/${appointmentId}`;
  return request(requestURL, {
    method: 'PUT',
    body: JSON.stringify(mapToBackendAppointment(appointmentFormData)),
    headers: {
      'Content-Type': 'application/json',
    },
  });
}

export function determineNotificationForAppointment(appointmentFormData) {
  let action = 'create';
  if (appointmentFormData.appointmentId) {
    action = 'edit';
  }
  return action;
}

function mapToBackendAppointment(appointmentFormData) {
  // TODO
  return appointmentFormData;
}
