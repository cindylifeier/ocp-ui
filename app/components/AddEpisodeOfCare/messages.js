/*
 * AddEpisodeOfCare Messages
 *
 * This contains all the text for the AddEpisodeOfCare component.
 */
import { defineMessages } from 'react-intl';

export default defineMessages({
  header: {
    id: 'ocpui.components.AddEpisodeOfCare.header',
    defaultMessage: 'Episode Of Care',
  },
  episodeOfCareButtton: {
    id: 'ocpui.components.AddEpisodeOfCare.episodeOfCareButtton',
    defaultMessage: 'Add Episode Of Care',
  },
  addEpisodeOFCareDialogHeader: {
    id: 'ocpui.components.AddEpisodeOfCare.addEpisodeOFCareDialogHeader',
    defaultMessage: 'Add Episode Of Care',
  },
  addedFlagsTable: {
    tableHeaderStatus: {
      id: 'ocpui.components.AddEpisodeOfCare.addedFlagsTable.tableHeaderStatus',
      defaultMessage: 'Status',
    },
    tableHeaderIdentifier: {
      id: 'ocpui.components.AddEpisodeOfCare.addedFlagsTable.tableHeaderIdentifier',
      defaultMessage: 'Identifier',
    },
    tableHeaderType: {
      id: 'ocpui.components.AddEpisodeOfCare.addedFlagsTable.tableHeaderType',
      defaultMessage: 'Type',
    },
    tableHeaderStartDate: {
      id: 'ocpui.components.AddEpisodeOfCare.addedFlagsTable.tableHeaderStartDate',
      defaultMessage: 'Start Date',
    },
    tableHeaderEndDate: {
      id: 'ocpui.components.AddEpisodeOfCare.addedFlagsTable.tableHeaderEndDate',
      defaultMessage: 'End Date',
    },
    tableHeaderCareManager: {
      id: 'ocpui.components.AddEpisodeOfCare.addedFlagsTable.tableHeaderCareManager',
      defaultMessage: 'Care Manager ',
    },
    tableHeaderAction: {
      id: 'ocpui.components.AddEpisodeOfCare.addedFlagsTable.tableHeaderAction',
      defaultMessage: 'Action',
    },
    tableActionEdit: {
      id: 'ocpui.components.AddEpisodeOfCare.addedFlagsTable.tableActionEdit',
      defaultMessage: 'Edit',
    },
    tableActionRemove: {
      id: 'ocpui.components.AddEpisodeOfCare.addedFlagsTable.tableActionRemove',
      defaultMessage: 'Remove',
    },
  },
  validation: {
    required: {
      id: 'ocpui.components.AddEpisodeOfCare.addFlagForm.validation.required',
      defaultMessage: 'Required',
    },
    minEndDate: {
      id: 'ocpui.components.AddEpisodeOfCare.addFlagForm.validation.minEndDate',
      defaultMessage: 'Flag End date field must be later than flag Start date field',
    },
  },
  hintText: {
    careManager: {
      id: 'ocpui.components.AddEpisodeOfCare.addFlagForm.hintText.careManager',
      defaultMessage: 'Care Manager',
    },
    status: {
      id: 'ocpui.components.AddEpisodeOfCare.addFlagForm.hintText.status',
      defaultMessage: 'Status',
    },
    patientName: {
      id: 'ocpui.components.AddEpisodeOfCare.addFlagForm.hintText.status',
      defaultMessage: 'Patient Name',
    },
    type: {
      id: 'ocpui.components.AddEpisodeOfCare.addFlagForm.hintText.type',
      defaultMessage: 'Type',
    },
    identifier: {
      id: 'ocpui.components.AddEpisodeOfCare.addFlagForm.hintText.identifier',
      defaultMessage: 'Identifier',
    },
    startDate: {
      id: 'ocpui.components.AddEpisodeOfCare.addFlagForm.hintText.startDate',
      defaultMessage: 'Start Date',
    },
    endDate: {
      id: 'ocpui.components.AddEpisodeOfCare.addFlagForm.hintText.endDate',
      defaultMessage: 'end Date',
    },
  },
  floatingLabelText: {
    careManager: {
      id: 'ocpui.components.AddEpisodeOfCare.addFlagForm.floatingLabelText.careManager',
      defaultMessage: 'Care Manager',
    },
    patientName: {
      id: 'ocpui.components.AddEpisodeOfCare.addFlagForm.floatingLabelText.status',
      defaultMessage: 'Patient Name',
    },
    type: {
      id: 'ocpui.components.AddEpisodeOfCare.addFlagForm.floatingLabelText.type',
      defaultMessage: 'Type',
    },
    status: {
      id: 'ocpui.components.AddEpisodeOfCare.addFlagForm.floatingLabelText.status',
      defaultMessage: 'Status',
    },
    identifier: {
      id: 'ocpui.components.AddEpisodeOfCare.addFlagForm.floatingLabelText.identifier',
      defaultMessage: 'Identifier',
    },
    startDate: {
      id: 'ocpui.components.AddEpisodeOfCare.addFlagForm.floatingLabelText.startDate',
      defaultMessage: 'Start Date',
    },
    endDate: {
      id: 'ocpui.components.AddEpisodeOfCare.addFlagForm.floatingLabelText.endDate',
      defaultMessage: 'end Date',
    },
  },
  saveButton: {
    id: 'ocpui.components.AddEpisodeOfCare.saveButton',
    defaultMessage: 'Save',
  },
  cancelButton: {
    id: 'ocpui.components.AddEpisodeOfCare.cancelButton',
    defaultMessage: 'Cancel',
  },
});
