/*
 * AddParticipantOrServiceDialog Messages
 *
 * This contains all the text for the AddParticipantOrServiceDialog component.
 */
import { defineMessages } from 'react-intl';

export default defineMessages({
  addParticipantOrServiceDialogTitle: {
    id: 'ocpui.containers.AddParticipantOrServiceDialog.addParticipantOrServiceDialogTitle',
    defaultMessage: 'Add appointment for:',
  },
  serviceTabLabel: {
    id: 'ocpui.containers.AddParticipantOrServiceDialog.serviceTabLabel',
    defaultMessage: 'Service',
  },
  careTeamTabLabel: {
    id: 'ocpui.containers.AddParticipantOrServiceDialog.careTeamTabLabel',
    defaultMessage: 'Care Team',
  },
  nonCareTeamTabLabel: {
    id: 'ocpui.containers.AddParticipantOrServiceDialog.nonCareTeamTabLabel',
    defaultMessage: 'Non-Care Team',
  },
  saveButton: {
    id: 'ocpui.containers.AddParticipantOrServiceDialog.saveButton',
    defaultMessage: 'Save',
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
    minStartDate: {
      id: 'ocpui.components.AddParticipantOrServiceDialog.validation.minStartDate',
      defaultMessage: 'Start date field must be later than today',
    },
    minEndDate: {
      id: 'ocpui.components.AddParticipantOrServiceDialog.validation.minEndDate',
      defaultMessage: 'End date field must be later than Start date field',
    },
    checkParticipants: {
      id: 'ocpui.components.AddParticipantOrServiceDialog.validation.checkParticipants',
      defaultMessage: 'At least one participant must be selected',
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
    selectedCareTeam: {
      id: 'ocpui.components.AddParticipantOrServiceDialog.hintText.selectedCareTeam',
      defaultMessage: 'Select Care Team Member',
    },
    serviceName: {
      id: 'ocpui.components.AddParticipantOrServiceDialog.hintText.serviceName',
      defaultMessage: 'Enter service',
    },
    locationName: {
      id: 'ocpui.components.AddParticipantOrServiceDialog.hintText.locationName',
      defaultMessage: 'Enter location',
    },
    practitionerName: {
      id: 'ocpui.components.AddParticipantOrServiceDialog.hintText.practitionerName',
      defaultMessage: 'Enter practitioner name',
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
    selectedCareTeam: {
      id: 'ocpui.components.AddParticipantOrServiceDialog.floatingLabelText.selectedCareTeam',
      defaultMessage: 'Select Care Team Member',
    },
    serviceName: {
      id: 'ocpui.components.AddParticipantOrServiceDialog.floatingLabelText.serviceName',
      defaultMessage: 'Enter service',
    },
    locationName: {
      id: 'ocpui.components.AddParticipantOrServiceDialog.floatingLabelText.locationName',
      defaultMessage: 'Enter location',
    },
    practitionerName: {
      id: 'ocpui.components.AddParticipantOrServiceDialog.floatingLabelText.practitionerName',
      defaultMessage: 'Enter practitioner name',
    },
  },
});
