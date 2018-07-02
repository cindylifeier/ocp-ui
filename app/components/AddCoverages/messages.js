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
  addFlagButton: {
    id: 'ocpui.components.AddCoverages.addFlagButton',
    defaultMessage: 'Add Coverage',
  },
  addFlagDialogHeader: {
    id: 'ocpui.components.AddCoverages.addFlagDialogHeader',
    defaultMessage: 'Add Advisory',
  },
  addedCoveragesTable: {
    tableHeaderStatus: {
      id: 'ocpui.components.AddCoverages.addedCoveragesTable.tableHeaderStatus',
      defaultMessage: 'Status',
    },
    tableHeaderCategory: {
      id: 'ocpui.components.AddCoverages.addedCoveragesTable.tableHeaderCategory',
      defaultMessage: 'Category',
    },
    tableHeaderCode: {
      id: 'ocpui.components.AddCoverages.addedCoveragesTable.tableHeaderCode',
      defaultMessage: 'Note',
    },
    tableHeaderStartDate: {
      id: 'ocpui.components.AddCoverages.addedCoveragesTable.tableHeaderStartDate',
      defaultMessage: 'Start Date',
    },
    tableHeaderEndDate: {
      id: 'ocpui.components.AddCoverages.addedCoveragesTable.tableHeaderEndDate',
      defaultMessage: 'End Date',
    },
    tableHeaderAuthor: {
      id: 'ocpui.components.AddCoverages.addedCoveragesTable.tableHeaderAuthor',
      defaultMessage: 'Author',
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
      defaultMessage: 'Flag End date field must be later than flag Start date field',
    },
  },
  hintText: {
    category: {
      id: 'ocpui.components.AddCoverages.addCoveragesForm.hintText.category',
      defaultMessage: 'Category',
    },
    status: {
      id: 'ocpui.components.AddCoverages.addCoveragesForm.hintText.status',
      defaultMessage: 'Status',
    },
    patientName: {
      id: 'ocpui.components.AddCoverages.addCoveragesForm.hintText.status',
      defaultMessage: 'Patient Name',
    },
    author: {
      id: 'ocpui.components.AddCoverages.addCoveragesForm.hintText.author',
      defaultMessage: 'Author',
    },
    code: {
      id: 'ocpui.components.AddCoverages.addCoveragesForm.hintText.code',
      defaultMessage: 'Note',
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
    category: {
      id: 'ocpui.components.AddCoverages.addCoveragesForm.floatingLabelText.category',
      defaultMessage: 'Category',
    },
    patientName: {
      id: 'ocpui.components.AddCoverages.addCoveragesForm.floatingLabelText.status',
      defaultMessage: 'Patient Name',
    },
    author: {
      id: 'ocpui.components.AddCoverages.addCoveragesForm.floatingLabelText.author',
      defaultMessage: 'Author',
    },
    status: {
      id: 'ocpui.components.AddCoverages.addCoveragesForm.floatingLabelText.status',
      defaultMessage: 'Status',
    },
    code: {
      id: 'ocpui.components.AddCoverages.addCoveragesForm.floatingLabelText.code',
      defaultMessage: 'Note',
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
