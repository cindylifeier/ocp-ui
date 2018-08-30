/*
 * AddAppointmentParticipantModal Messages
 *
 * This contains all the text for the AddAppointmentParticipantModal component.
 */
import { defineMessages } from 'react-intl';

export default defineMessages({
  addParticipantBtn: {
    id: 'ocpui.components.AddAppointmentParticipantModal.addParticipantBtn',
    defaultMessage: 'Add Participant Details',
  },
  dialogTitle: {
    id: 'ocpui.components.AddAppointmentParticipantModal.dialogTitle',
    defaultMessage: 'Add Participant Details',
  },
  inOrgTabLabel: {
    id: 'ocpui.containers.AddParticipantForm.inOrgTabLabel',
    defaultMessage: 'Inside Organization',
  },
  outOfOrgTabLabel: {
    id: 'ocpui.containers.AddParticipantForm.outOfOrgTabLabel',
    defaultMessage: 'Out Of Organization',
  },
  locationTabLabel: {
    id: 'ocpui.containers.AddParticipantForm.locationTabLabel',
    defaultMessage: 'Location',
  },
  serviceTabLabel: {
    id: 'ocpui.containers.AddParticipantForm.serviceTabLabel',
    defaultMessage: 'Service',
  },
  saveButton: {
    id: 'ocpui.containers.AddParticipantForm.saveButton',
    defaultMessage: 'Add',
  },
  cancelButton: {
    id: 'ocpui.containers.AddParticipantForm.cancelButton',
    defaultMessage: 'Cancel',
  },
  validation: {
    required: {
      id: 'ocpui.components.AddParticipantForm.validation.required',
      defaultMessage: 'Required',
    },
  },
  hintText: {
    selectService: {
      id: 'ocpui.components.AddParticipantForm.hintText.selectService',
      defaultMessage: 'Select Service',
    },
    selectLocation: {
      id: 'ocpui.components.AddParticipantForm.hintText.selectLocation',
      defaultMessage: 'Select Location',
    },
    selectPractitioner: {
      id: 'ocpui.components.AddParticipantForm.hintText.selectPractitioner',
      defaultMessage: 'Select Practitioner',
    },
    selectPractitionerAttendance: {
      id: 'ocpui.components.AddParticipantForm.hintText.selectPractitionerAttendance',
      defaultMessage: 'Attendance',
    },
  },
  floatingLabelText: {
    selectService: {
      id: 'ocpui.components.AddParticipantForm.floatingLabelText.selectService',
      defaultMessage: 'Select Service',
    },
    selectLocation: {
      id: 'ocpui.components.AddParticipantForm.floatingLabelText.selectLocation',
      defaultMessage: 'Select Location',
    },
    selectPractitioner: {
      id: 'ocpui.components.AddParticipantForm.floatingLabelText.selectPractitioner',
      defaultMessage: 'Select Practitioner',
    },
    selectPractitionerAttendance: {
      id: 'ocpui.components.AddParticipantForm.floatingLabelText.selectPractitionerAttendance',
      defaultMessage: 'Attendance',
    },
  },
  addedParticipantsTable: {
    tableHeaderName: {
      id: 'ocpui.components.addedParticipantsTable.tableHeaderName',
      defaultMessage: 'Name',
    },
    tableHeaderType: {
      id: 'ocpui.components.addedParticipantsTable.tableHeaderType',
      defaultMessage: 'Type',
    },
    tableHeaderParticipationType: {
      id: 'ocpui.components.addedParticipantsTable.tableHeaderParticipationType',
      defaultMessage: 'Participation Type',
    },
    tableHeaderAttendance: {
      id: 'ocpui.components.addedParticipantsTable.tableHeaderAttendance',
      defaultMessage: 'Attendance',
    },
    tableHeaderStatus: {
      id: 'ocpui.components.addedParticipantsTable.tableHeaderStatus',
      defaultMessage: 'Status',
    },
    tableHeaderAction: {
      id: 'ocpui.components.addedParticipantsTable.tableHeaderAction',
      defaultMessage: 'Action',
    },
    removeParticipantBtn: {
      id: 'ocpui.components.addedParticipantsTable.removeParticipantBtn',
      defaultMessage: 'Remove',
    },
  },
});
