/*
 *
 * ManageAppointmentPage actions
 *
 */

import { CREATE_APPOINTMENT, INITIALIZE_MANAGE_APPOINTMENT } from 'containers/ManageAppointmentPage/constants';

export function initializeManageAppointment() {
  return {
    type: INITIALIZE_MANAGE_APPOINTMENT,
  };
}

export function createAppointment(appointment, handleSubmitting) {
  return {
    type: CREATE_APPOINTMENT,
    appointment,
    handleSubmitting,
  };
}
