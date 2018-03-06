/*
 * SearchRecipient Messages
 *
 * This contains all the text for the SearchRecipient component.
 */
import { defineMessages } from 'react-intl';

export default defineMessages({
  dialogCancelBtnLabel: {
    id: 'ocpui.components.SearchRecipient.dialogCancelBtnLabel',
    defaultMessage: 'Cancel',
  },
  dialogAddBtnLabel: {
    id: 'ocpui.components.SearchRecipient.dialogAddBtnLabel',
    defaultMessage: 'Add',
  },
  addRecipientDialogTitle: {
    id: 'ocpui.components.SearchRecipient.addRecipientDialogTitle',
    defaultMessage: 'Add Recipient',
  },
  searchButtonTooltip: {
    id: 'ocpui.components.SearchRecipient.searchButtonTooltip',
    defaultMessage: 'Search',
  },
  addParticipantBtnLabel: {
    id: 'ocpui.components.SearchRecipient.addParticipantBtnLabel',
    defaultMessage: 'Add',
  },
  removeParticipantBtnLabel: {
    id: 'ocpui.components.SearchRecipient.removeParticipantBtnLabel',
    defaultMessage: 'Remove',
  },
  recipientTableHeaderName: {
    id: 'ocpui.components.SearchRecipient.recipientTableHeaderName',
    defaultMessage: 'Name',
  },
  recipientTableHeaderRole: {
    id: 'ocpui.components.SearchRecipient.recipientTableHeaderRole',
    defaultMessage: 'Role',
  },
  participantTableHeaderStartDate: {
    id: 'ocpui.components.SearchRecipient.participantTableHeaderStartDate',
    defaultMessage: 'Start Date',
  },
  participantTableHeaderEndDate: {
    id: 'ocpui.components.SearchRecipient.participantTableHeaderEndDate',
    defaultMessage: 'End Date',
  },
  participantTableHeaderAction: {
    id: 'ocpui.components.SearchRecipient.participantTableHeaderAction',
    defaultMessage: 'Action',
  },
  noRecipientRecord: {
    id: 'ocpui.components.SearchRecipient.noRecipientRecord',
    defaultMessage: 'No Recipient found.',
  },
  hintText: {
    practitionerName: {
      id: 'ocpui.components.SearchRecipient.hintText.practitionerName',
      defaultMessage: 'Name',
    },
    startDate: {
      id: 'ocpui.components.SearchRecipient.hintText.startDate',
      defaultMessage: 'Start Date',
    },
    endDate: {
      id: 'ocpui.components.SearchRecipient.hintText.endDate',
      defaultMessage: 'End Date',
    },
  },
  floatingLabelText: {
    practitionerName: {
      id: 'ocpui.components.SearchRecipient.floatingLabelText.practitionerName',
      defaultMessage: 'Name',
    },
    practitionerMember: {
      id: 'ocpui.components.SearchRecipient.floatingLabelText.practitionerMember',
      defaultMessage: 'Member Type',
    },
    startDate: {
      id: 'ocpui.components.SearchRecipient.floatingLabelText.startDate',
      defaultMessage: 'Start Date',
    },
    endDate: {
      id: 'ocpui.components.SearchRecipient.floatingLabelText.endDate',
      defaultMessage: 'End Date',
    },
    participantRole: {
      id: 'ocpui.components.SearchRecipient.floatingLabelText.participantRole',
      defaultMessage: 'Role',
    },
  },
  validation: {
    required: {
      id: 'ocpui.components.SearchRecipient.validation.required',
      defaultMessage: 'Required',
    },
    invalid: {
      id: 'ocpui.components.SearchRecipient.validation.invalid',
      defaultMessage: 'Invalid value',
    },
    minStartDate: {
      id: 'ocpui.components.SearchRecipient.validation.minStartDate',
      defaultMessage: 'Start date field must be later than today',
    },
    minEndDate: {
      id: 'ocpui.components.SearchRecipient.validation.minEndDate',
      defaultMessage: 'End date field must be later than Start date field',
    },
    minLength: {
      id: 'ocpui.components.SearchRecipient.validation.minLength',
      defaultMessage: 'Minimum {minimumLength} characters',
    },
  },
});
