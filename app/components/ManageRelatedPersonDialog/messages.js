/*
 * ManageRelatedPersonDialog Messages
 *
 * This contains all the text for the ManageRelatedPersonDialog component.
 */
import { defineMessages } from 'react-intl';

export default defineMessages({
  manageRelatedPersonDialogTitle: {
    id: 'ocpui.components.ManageRelatedPersonDialog.manageRelatedPersonDialogTitle',
    defaultMessage: 'Manage Related Person',
  },
  cancelButton: {
    id: 'ocpui.components.ManageRelatedPersonDialog.cancelButton',
    defaultMessage: 'Cancel',
  },
  relatedPersonNameHintText: {
    id: 'ocpui.components.SearchRelatedPersonsField.relatedPersonNameHintText',
    defaultMessage: 'Name',
  },
  searchButton: {
    id: 'ocpui.components.SearchRelatedPersonsField.searchButton',
    defaultMessage: 'Search',
  },
  validation: {
    required: {
      id: 'ocpui.components.SearchRelatedPersonsField.validation.required',
      defaultMessage: 'Required',
    },
    minLength: {
      id: 'ocpui.components.SearchRelatedPersonsField.validation.minLength',
      defaultMessage: 'Minimum {minimumLength} characters',
    },
  },
  manageRelatedPersonTableHeaderName: {
    id: 'ocpui.components.ManageRelatedPersonTable.manageRelatedPersonTableHeaderName',
    defaultMessage: 'Name',
  },
  manageRelatedPersonTableHeaderRole: {
    id: 'ocpui.components.ManageRelatedPersonTable.manageRelatedPersonTableHeaderRole',
    defaultMessage: 'Role',
  },
  manageRelatedPersonTableHeaderStartDate: {
    id: 'ocpui.components.ManageRelatedPersonTable.manageRelatedPersonTableHeaderStartDate',
    defaultMessage: 'Start Date',
  },
  manageRelatedPersonTableHeaderEndDate: {
    id: 'ocpui.components.ManageRelatedPersonTable.manageRelatedPersonTableHeaderEndDate',
    defaultMessage: 'End Date',
  },
  manageRelatedPersonTableHeaderAction: {
    id: 'ocpui.components.ManageRelatedPersonTable.manageRelatedPersonTableHeaderAction',
    defaultMessage: 'Action',
  },
  noRelatedPersonFoundText: {
    id: 'ocpui.components.ManageRelatedPersonTable.noRelatedPersonFoundText',
    defaultMessage: 'No related person found.',
  },
});
