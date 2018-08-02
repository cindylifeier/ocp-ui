/*
 * AddParticipantOrServiceDialog Messages
 *
 * This contains all the text for the AddParticipantOrServiceDialog component.
 */
import { defineMessages } from 'react-intl';

export default defineMessages({
  addCoverageDialogCancelBtnLabel: {
    id: 'ocpui.containers.AddParticipantOrServiceDialog.addCoverageDialogCancelBtnLabel',
    defaultMessage: 'Cancel',
  },
  addParticipantOrServiceDialogTitle: {
    id: 'ocpui.containers.AddParticipantOrServiceDialog.addParticipantOrServiceDialogTitle',
    defaultMessage: 'Add appointment for:',
  },
  saveButton: {
    id: 'ocpui.containers.AddParticipantOrServiceDialog.saveButton',
    defaultMessage: 'Save',
  },
  cancelButton: {
    id: 'ocpui.containers.AddParticipantOrServiceDialog.cancelButton',
    defaultMessage: 'Cancel',
  },
  addCoverageDialogSaveBtnLabel: {
    id: 'ocpui.containers.AddParticipantOrServiceDialog.addCoverageDialogSaveBtnLabel',
    defaultMessage: 'Save',
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
    beneficiary: {
      id: 'ocpui.components.AddParticipantOrServiceDialog.hintText.beneficiary',
      defaultMessage: 'Beneficiary',
    },
    subscriber: {
      id: 'ocpui.components.AddParticipantOrServiceDialog.hintText.subscriber',
      defaultMessage: 'Subscriber',
    },
    relationship: {
      id: 'ocpui.components.AddParticipantOrServiceDialog.hintText.relationship',
      defaultMessage: 'Relationship',
    },
    subscriberId: {
      id: 'ocpui.components.AddParticipantOrServiceDialog.hintText.subscriberId',
      defaultMessage: 'SubscriberId',
    },
    status: {
      id: 'ocpui.components.AddParticipantOrServiceDialog.hintText.status',
      defaultMessage: 'Status',
    },
    coverageType: {
      id: 'ocpui.components.AddParticipantOrServiceDialog.hintText.coverageType',
      defaultMessage: 'Coverage Type',
    },
    startDate: {
      id: 'ocpui.components.AddParticipantOrServiceDialog.hintText.startDate',
      defaultMessage: 'Start Date',
    },
    endDate: {
      id: 'ocpui.components.AddParticipantOrServiceDialog.hintText.endDate',
      defaultMessage: 'End Date',
    },
  },
  floatingLabelText: {
    beneficiary: {
      id: 'ocpui.components.AddParticipantOrServiceDialog.floatingLabelText.beneficiary',
      defaultMessage: 'Beneficiary',
    },
    subscriber: {
      id: 'ocpui.components.AddParticipantOrServiceDialog.floatingLabelText.subscriber',
      defaultMessage: 'Subscriber',
    },
    relationship: {
      id: 'ocpui.components.AddParticipantOrServiceDialog.floatingLabelText.relationship',
      defaultMessage: 'Relationship',
    },
    subscriberId: {
      id: 'ocpui.components.AddParticipantOrServiceDialog.floatingLabelText.subscriberId',
      defaultMessage: 'Subscriber Id',
    },
    status: {
      id: 'ocpui.components.AddParticipantOrServiceDialog.floatingLabelText.status',
      defaultMessage: 'Status',
    },
    coverageType: {
      id: 'ocpui.components.AddParticipantOrServiceDialog.floatingLabelText.coverageType',
      defaultMessage: 'Coverage Type',
    },
    startDate: {
      id: 'ocpui.components.AddParticipantOrServiceDialog.floatingLabelText.startDate',
      defaultMessage: 'Start Date',
    },
    endDate: {
      id: 'ocpui.components.AddParticipantOrServiceDialog.floatingLabelText.endDate',
      defaultMessage: 'End Date',
    },
  },
});
