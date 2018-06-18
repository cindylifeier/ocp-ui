/*
 * AddCoverageDialog Messages
 *
 * This contains all the text for the AddCoverageDialog component.
 */
import { defineMessages } from 'react-intl';

export default defineMessages({
  addCoverageDialogCancelBtnLabel: {
    id: 'ocpui.containers.AddCoverageDialog.addCoverageDialogCancelBtnLabel',
    defaultMessage: 'Cancel',
  },
  addCoverageDialogTitle: {
    id: 'ocpui.containers.AddCoverageDialog.addCoverageDialogTitle',
    defaultMessage: 'Coverage',
  },
  saveButton: {
    id: 'ocpui.containers.AddCoverageDialog.saveButton',
    defaultMessage: 'Save',
  },
  cancelButton: {
    id: 'ocpui.containers.AddCoverageDialog.cancelButton',
    defaultMessage: 'Cancel',
  },
  addCoverageDialogSaveBtnLabel: {
    id: 'ocpui.containers.AddCoverageDialog.addCoverageDialogSaveBtnLabel',
    defaultMessage: 'Save',
  },
  validation: {
    minLength: {
      id: 'ocpui.components.AddCoverageDialog.validation.minLength',
      defaultMessage: 'Minimum {minimumLength} characters',
    },
    required: {
      id: 'ocpui.components.AddCoverageDialog.validation.required',
      defaultMessage: 'Required',
    },
    invalid: {
      id: 'ocpui.components.AddCoverageDialog.validation.invalid',
      defaultMessage: 'Invalid value',
    },
    minStartDate: {
      id: 'ocpui.components.AddCoverageDialog.validation.minStartDate',
      defaultMessage: 'Start date field must be later than today',
    },
    minEndDate: {
      id: 'ocpui.components.AddCoverageDialog.validation.minEndDate',
      defaultMessage: 'End date field must be later than Start date field',
    },
    checkParticipants: {
      id: 'ocpui.components.AddCoverageDialog.validation.checkParticipants',
      defaultMessage: 'At least one participant must be selected',
    },
  },
  hintText: {
    beneficiary: {
      id: 'ocpui.components.AddCoverageDialog.hintText.beneficiary',
      defaultMessage: 'Beneficiary',
    },
    subscriber: {
      id: 'ocpui.components.AddCoverageDialog.hintText.subscriber',
      defaultMessage: 'Subscriber',
    },
    relationship: {
      id: 'ocpui.components.AddCoverageDialog.hintText.relationship',
      defaultMessage: 'Relationship',
    },
    subscriberId: {
      id: 'ocpui.components.AddCoverageDialog.hintText.subscriberId',
      defaultMessage: 'SubscriberId',
    },
    status: {
      id: 'ocpui.components.AddCoverageDialog.hintText.status',
      defaultMessage: 'Status',
    },
    coverageType: {
      id: 'ocpui.components.AddCoverageDialog.hintText.coverageType',
      defaultMessage: 'Coverage Type',
    },
    startDate: {
      id: 'ocpui.components.AddCoverageDialog.hintText.startDate',
      defaultMessage: 'Start Date',
    },
    endDate: {
      id: 'ocpui.components.AddCoverageDialog.hintText.endDate',
      defaultMessage: 'End Date',
    },
  },
  floatingLabelText: {
    beneficiary: {
      id: 'ocpui.components.AddCoverageDialog.floatingLabelText.beneficiary',
      defaultMessage: 'Beneficiary',
    },
    subscriber: {
      id: 'ocpui.components.AddCoverageDialog.floatingLabelText.subscriber',
      defaultMessage: 'Subscriber',
    },
    relationship: {
      id: 'ocpui.components.AddCoverageDialog.floatingLabelText.relationship',
      defaultMessage: 'Relationship',
    },
    subscriberId: {
      id: 'ocpui.components.AddCoverageDialog.floatingLabelText.subscriberId',
      defaultMessage: 'Subscriber Id',
    },
    status: {
      id: 'ocpui.components.AddCoverageDialog.floatingLabelText.status',
      defaultMessage: 'Status',
    },
    coverageType: {
      id: 'ocpui.components.AddCoverageDialog.floatingLabelText.coverageType',
      defaultMessage: 'Coverage Type',
    },
    startDate: {
      id: 'ocpui.components.AddCoverageDialog.floatingLabelText.startDate',
      defaultMessage: 'Start Date',
    },
    endDate: {
      id: 'ocpui.components.AddCoverageDialog.floatingLabelText.endDate',
      defaultMessage: 'End Date',
    },
  },
});
