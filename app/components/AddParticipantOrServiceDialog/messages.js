/*
 * AddParticipantOrServiceDialog Messages
 *
 * This contains all the text for the AddParticipantOrServiceDialog component.
 */
import { defineMessages } from 'react-intl';

export default defineMessages({
  addParticipantOrServiceDialogTitle: {
    id: 'ocpui.containers.AddParticipantOrServiceDialog.addParticipantOrServiceDialogTitle',
    defaultMessage: 'Add Participant Details',
  },
  inOrgTabLabel: {
    id: 'ocpui.containers.AddParticipantOrServiceDialog.inOrgTabLabel',
    defaultMessage: 'Inside Organization',
  },
  outOfOrgTabLabel: {
    id: 'ocpui.containers.AddParticipantOrServiceDialog.outOfOrgTabLabel',
    defaultMessage: 'Out Of Organization',
  },
  locationTabLabel: {
    id: 'ocpui.containers.AddParticipantOrServiceDialog.locationTabLabel',
    defaultMessage: 'Location',
  },
  serviceTabLabel: {
    id: 'ocpui.containers.AddParticipantOrServiceDialog.serviceTabLabel',
    defaultMessage: 'Service',
  },
  saveButton: {
    id: 'ocpui.containers.AddParticipantOrServiceDialog.saveButton',
    defaultMessage: 'Add',
  },
  cancelButton: {
    id: 'ocpui.containers.AddParticipantOrServiceDialog.cancelButton',
    defaultMessage: 'Cancel',
  },
  validation: {
    minLength: {
      id: 'ocpui.components.AddParticipantOrServiceDialog.validation.minLength',
      defaultMessage: 'Minimum {minimumLength} characters',
    },
    required: {
      id: 'ocpui.components.AddParticipantOrServiceDialog.validation.required',
      defaultMessage: 'Required',
    },
    invalid: {
      id: 'ocpui.components.AddParticipantOrServiceDialog.validation.invalid',
      defaultMessage: 'Invalid value',
    },
  },
  hintText: {
    selectService: {
      id: 'ocpui.components.AddParticipantOrServiceDialog.hintText.selectService',
      defaultMessage: 'Select Service',
    },
    selectLocation: {
      id: 'ocpui.components.AddParticipantOrServiceDialog.hintText.selectLocation',
      defaultMessage: 'Select Location',
    },
    selectPractitioner: {
      id: 'ocpui.components.AddParticipantOrServiceDialog.hintText.selectPractitioner',
      defaultMessage: 'Select Practitioner',
    },
    selectPractitionerAttendance: {
      id: 'ocpui.components.AddParticipantOrServiceDialog.hintText.selectPractitionerAttendance',
      defaultMessage: 'Attendance',
    },
  },
  floatingLabelText: {
    selectService: {
      id: 'ocpui.components.AddParticipantOrServiceDialog.floatingLabelText.selectService',
      defaultMessage: 'Select Service',
    },
    selectLocation: {
      id: 'ocpui.components.AddParticipantOrServiceDialog.floatingLabelText.selectLocation',
      defaultMessage: 'Select Location',
    },
    selectPractitioner: {
      id: 'ocpui.components.AddParticipantOrServiceDialog.floatingLabelText.selectPractitioner',
      defaultMessage: 'Select Practitioner',
    },
    selectPractitionerAttendance: {
      id: 'ocpui.components.AddParticipantOrServiceDialog.floatingLabelText.selectPractitionerAttendance',
      defaultMessage: 'Attendance',
    },
  },
});
