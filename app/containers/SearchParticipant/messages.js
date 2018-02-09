/*
 * SearchParticipant Messages
 *
 * This contains all the text for the SearchParticipant component.
 */
import { defineMessages } from 'react-intl';

export default defineMessages({
  addParticipantDialogCancelBtnLabel: {
    id: 'ocpui.components.SearchParticipant.addParticipantDialogCancelBtnLabel',
    defaultMessage: 'Cancel',
  },
  addParticipantDialogTitle: {
    id: 'ocpui.components.SearchParticipant.addParticipantDialogTitle',
    defaultMessage: 'Add Participant',
  },
  searchButtonTooltip: {
    id: 'ocpui.components.SearchParticipant.searchButtonTooltip',
    defaultMessage: 'Search',
  },
  addParticipantBtnLabel: {
    id: 'ocpui.components.SearchParticipant.addParticipantBtnLabel',
    defaultMessage: 'Add',
  },
  removeParticipantBtnLabel: {
    id: 'ocpui.components.SearchParticipant.removeParticipantBtnLabel',
    defaultMessage: 'Remove',
  },
  participantTableHeaderName: {
    id: 'ocpui.components.SearchParticipant.participantTableHeaderName',
    defaultMessage: 'Name',
  },
  participantTableHeaderRole: {
    id: 'ocpui.components.SearchParticipant.participantTableHeaderRole',
    defaultMessage: 'Role',
  },
  participantTableHeaderPeriod: {
    id: 'ocpui.components.SearchParticipant.participantTableHeaderPeriod',
    defaultMessage: 'Period',
  },
  participantTableHeaderAction: {
    id: 'ocpui.components.SearchParticipant.participantTableHeaderAction',
    defaultMessage: 'Action',
  },
  noSearchParticipantResult: {
    id: 'ocpui.components.SearchParticipant.noSearchParticipantResult',
    defaultMessage: 'No Participant found.',
  },
  hintText: {
    practitionerName: {
      id: 'ocpui.components.SearchParticipant.hintText.practitionerName',
      defaultMessage: 'Name',
    },
    startDate: {
      id: 'ocpui.components.SearchParticipant.hintText.startDate',
      defaultMessage: 'Start Date',
    },
    endDate: {
      id: 'ocpui.components.SearchParticipant.hintText.endDate',
      defaultMessage: 'End Date',
    },
  },
  floatingLabelText: {
    practitionerName: {
      id: 'ocpui.components.SearchParticipant.floatingLabelText.practitionerName',
      defaultMessage: 'Name',
    },
    practitionerMember: {
      id: 'ocpui.components.SearchParticipant.floatingLabelText.practitionerMember',
      defaultMessage: 'Member Type',
    },
    startDate: {
      id: 'ocpui.components.SearchParticipant.floatingLabelText.startDate',
      defaultMessage: 'Start Date',
    },
    endDate: {
      id: 'ocpui.components.SearchParticipant.floatingLabelText.endDate',
      defaultMessage: 'End Date',
    },
    participantRole: {
      id: 'ocpui.components.SearchParticipant.floatingLabelText.participantRole',
      defaultMessage: 'Role',
    },
  },
  validation: {
    required: {
      id: 'ocpui.components.SearchParticipant.validation.required',
      defaultMessage: 'Required',
    },
    invalid: {
      id: 'ocpui.components.ManageCareTeam.validation.invalid',
      defaultMessage: 'Invalid value',
    },
    minStartDate: {
      id: 'ocpui.components.ManageCareTeam.validation.minStartDate',
      defaultMessage: 'Start date field must be later than today',
    },
    minEndDate: {
      id: 'ocpui.components.ManageCareTeam.validation.minEndDate',
      defaultMessage: 'End date field must be later than Start date field',
    },
  },
});
