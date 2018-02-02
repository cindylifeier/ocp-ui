/*
 * ManageCareTeam Messages
 *
 * This contains all the text for the ManageCareTeam component.
 */
import { defineMessages } from 'react-intl';

export default defineMessages({
  title: {
    id: 'ocpui.components.ManageCareTeam.title',
    defaultMessage: 'General Information',
  },
  addParticipantBtnLabel: {
    id: 'ocpui.components.ManageCareTeam.manageForm.addParticipantBtnLabel',
    defaultMessage: 'Add Participant',
  },
  validation: {
    minLength: {
      id: 'ocpui.components.ManageCareTeam.manageForm.validation.minLength',
      defaultMessage: 'Minimum {minimumLength} characters',
    },
    required: {
      id: 'ocpui.components.ManageCareTeam.manageForm.validation.required',
      defaultMessage: 'Required',
    },
    invalid: {
      id: 'ocpui.components.ManageCareTeam.manageForm.validation.invalid',
      defaultMessage: 'Invalid value',
    },
  },
  hintText: {
    careTeamName: {
      id: 'ocpui.components.ManageCareTeam.manageForm.hintText.careTeamName',
      defaultMessage: 'Care Team Name',
    },
    category: {
      id: 'ocpui.components.ManageCareTeam.manageForm.hintText.category',
      defaultMessage: 'Category',
    },
    status: {
      id: 'ocpui.components.ManageCareTeam.manageForm.hintText.status',
      defaultMessage: 'Status',
    },
    episodeOfCare: {
      id: 'ocpui.components.ManageCareTeam.manageForm.hintText.episodeOfCare',
      defaultMessage: 'Episode Of Care',
    },
    startDate: {
      id: 'ocpui.components.ManageCareTeam.manageForm.hintText.startDate',
      defaultMessage: 'Start Date',
    },
    endDate: {
      id: 'ocpui.components.ManageCareTeam.manageForm.hintText.endDate',
      defaultMessage: 'End Date',
    },
  },
  floatingLabelText: {
    careTeamName: {
      id: 'ocpui.components.ManageCareTeam.manageForm.floatingLabelText.careTeamName',
      defaultMessage: 'Care Team Name',
    },
    category: {
      id: 'ocpui.components.ManageCareTeam.manageForm.floatingLabelText.category',
      defaultMessage: 'Category',
    },
    status: {
      id: 'ocpui.components.ManageCareTeam.manageForm.floatingLabelText.status',
      defaultMessage: 'Status',
    },
    episodeOfCare: {
      id: 'ocpui.components.ManageCareTeam.manageForm.floatingLabelText.episodeOfCare',
      defaultMessage: 'Episode Of Care',
    },
    startDate: {
      id: 'ocpui.components.ManageCareTeam.manageForm.floatingLabelText.startDate',
      defaultMessage: 'Start Date',
    },
    endDate: {
      id: 'ocpui.components.ManageCareTeam.manageForm.floatingLabelText.endDate',
      defaultMessage: 'End Date',
    },
  },
});
