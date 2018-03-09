/*
 *
 * ManageAppointmentPage actions
 *
 */

import {
  INITIALIZE_MANAGE_APPOINTMENT,
  SAVE_APPOINTMENT,
} from 'containers/ManageAppointmentPage/constants';

export function initializeManageAppointment() {
  return {
    type: INITIALIZE_MANAGE_APPOINTMENT,
  };
}

export function saveAppointment(appointment, handleSubmitting) {
  return {
    type: SAVE_APPOINTMENT,
    appointment,
    handleSubmitting,
  };
}
