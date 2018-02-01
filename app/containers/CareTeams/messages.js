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
    defaultMessage: 'No care teams loaded. Please select a patient to view his/her care teams.',
  },
});
