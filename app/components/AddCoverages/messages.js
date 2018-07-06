/*
 * AddCoverages Messages
 *
 * This contains all the text for the AddCoverages component.
 */
import { defineMessages } from 'react-intl';

export default defineMessages({
  header: {
    id: 'ocpui.components.AddCoverages.header',
    defaultMessage: 'Coverage',
  },
  addCoverageButton: {
    id: 'ocpui.components.AddCoverages.addCoverageButton',
    defaultMessage: 'Add Coverage',
  },
  addCoverageDialogHeader: {
    id: 'ocpui.components.AddCoverages.addCoverageDialogHeader',
    defaultMessage: 'Add Coverage',
  },
  addedCoveragesTable: {
    tableHeaderStatus: {
      id: 'ocpui.components.AddCoverages.addedCoveragesTable.tableHeaderStatus',
      defaultMessage: 'Status',
    },
    tableHeaderCoverage: {
      id: 'ocpui.components.AddCoverages.addedCoveragesTable.tableHeaderCoverage',
      defaultMessage: 'Coverage',
    },
    id: {
      id: 'ocpui.components.AddCoverages.addedCoveragesTable.id',
      defaultMessage: 'ID',
    },
    tableHeaderPeriod: {
      id: 'ocpui.components.AddCoverages.addedCoveragesTable.tableHeaderPeriod',
      defaultMessage: 'Period',
    },
    tableHeaderSubscriber: {
      id: 'ocpui.components.AddCoverages.addedCoveragesTable.tableHeaderSubscriber',
      defaultMessage: 'Subscriber',
    },
    tableHeaderBeneficiary: {
      id: 'ocpui.components.AddCoverages.addedCoveragesTable.tableHeaderBeneficiary',
      defaultMessage: 'Beneficiary',
    },
    tableHeaderAction: {
      id: 'ocpui.components.AddCoverages.addedCoveragesTable.tableHeaderAction',
      defaultMessage: 'Action',
    },
    tableActionEdit: {
      id: 'ocpui.components.AddCoverages.addedCoveragesTable.tableActionEdit',
      defaultMessage: 'Edit',
    },
    tableActionRemove: {
      id: 'ocpui.components.AddCoverages.addedCoveragesTable.tableActionRemove',
      defaultMessage: 'Remove',
    },
  },
  validation: {
    required: {
      id: 'ocpui.components.AddCoverages.addCoveragesForm.validation.required',
      defaultMessage: 'Required',
    },
    minEndDate: {
      id: 'ocpui.components.AddCoverages.addCoveragesForm.validation.minEndDate',
      defaultMessage: 'End date field must be later than Start date field',
    },
    minStartDate: {
      id: 'ocpui.components.AddCoverages.addCoveragesForm.validation.minStartDate',
      defaultMessage: 'Start date field cannot be in the past',
    },
  },
  hintText: {
    subscriberId: {
      id: 'ocpui.components.AddCoverages.addCoveragesForm.hintText.subscriberId',
      defaultMessage: 'Subscriber Id',
    },
    relationship: {
      id: 'ocpui.components.AddCoverages.addCoveragesForm.hintText.relationship',
      defaultMessage: 'Relationship',
    },
    beneficiary: {
      id: 'ocpui.components.AddCoverages.addCoveragesForm.hintText.beneficiary',
      defaultMessage: 'Beneficiary',
    },
    subscriber: {
      id: 'ocpui.components.AddCoverages.addCoveragesForm.hintText.subscriber',
      defaultMessage: 'Subscriber',
    },
    coverageType: {
      id: 'ocpui.components.AddCoverages.addCoveragesForm.hintText.coverageType',
      defaultMessage: 'Coverage Type',
    },
    status: {
      id: 'ocpui.components.AddCoverages.addCoveragesForm.hintText.status',
      defaultMessage: 'Status',
    },
    startDate: {
      id: 'ocpui.components.AddCoverages.addCoveragesForm.hintText.startDate',
      defaultMessage: 'Start Date',
    },
    endDate: {
      id: 'ocpui.components.AddCoverages.addCoveragesForm.hintText.endDate',
      defaultMessage: 'end Date',
    },
  },
  floatingLabelText: {
    subscriberId: {
      id: 'ocpui.components.AddCoverages.addCoveragesForm.floatingLabelText.subscriberId',
      defaultMessage: 'Subscriber Id',
    },
    beneficiary: {
      id: 'ocpui.components.AddCoverages.addCoveragesForm.floatingLabelText.beneficiary',
      defaultMessage: 'Beneficiary',
    },
    subscriber: {
      id: 'ocpui.components.AddCoverages.addCoveragesForm.floatingLabelText.subscriber',
      defaultMessage: 'Subscriber',
    },
    relationship: {
      id: 'ocpui.components.AddCoverages.addCoveragesForm.floatingLabelText.relationship',
      defaultMessage: 'Relationship',
    },
    status: {
      id: 'ocpui.components.AddCoverages.addCoveragesForm.floatingLabelText.status',
      defaultMessage: 'Status',
    },
    coverageType: {
      id: 'ocpui.components.AddCoverages.addCoveragesForm.floatingLabelText.coverageType',
      defaultMessage: 'Coverage Type',
    },
    startDate: {
      id: 'ocpui.components.AddCoverages.addCoveragesForm.floatingLabelText.startDate',
      defaultMessage: 'Start Date',
    },
    endDate: {
      id: 'ocpui.components.AddCoverages.addCoveragesForm.floatingLabelText.endDate',
      defaultMessage: 'end Date',
    },
  },
  saveFlagButton: {
    id: 'ocpui.components.AddCoverages.saveFlagButton',
    defaultMessage: 'Save',
  },
  cancelButton: {
    id: 'ocpui.components.AddCoverages.cancelButton',
    defaultMessage: 'Cancel',
  },
});
