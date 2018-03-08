/*
 * CareTeams Messages
 *
 * This contains all the text for the CareTeams component.
 */
import { defineMessages } from 'react-intl';

export default defineMessages({
  header: {
    id: 'ocpui.containers.CareTeams.header',
    defaultMessage: 'Care Teams',
  },
  patientNotSelected: {
    id: 'ocpui.containers.CareTeams.patientNotSelected',
    defaultMessage: 'No Care Teams loaded. Please select a patient to view his/her Care Teams.',
  },
  patientLabel: {
    id: 'ocpui.containers.CareTeams.patientLabel',
    defaultMessage: 'Patient:',
  },
});
