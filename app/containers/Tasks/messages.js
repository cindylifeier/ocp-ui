/*
 * Tasks Messages
 *
 * This contains all the text for the Tasks component.
 */
import { defineMessages } from 'react-intl';

export default defineMessages({
  patientNotSelected: {
    id: 'ocpui.containers.Tasks.patientNotSelected',
    defaultMessage: 'No tasks loaded. Please select a patient to view his/her tasks.',
  },
  noTasksFound: {
    id: 'ocpui.containers.Tasks.noTasksFound',
    defaultMessage: 'No tasks found.',
  },
  labelPatientName: {
    id: 'ocpui.containers.Tasks.labelPatientName',
    defaultMessage: 'Patient:',
  },
});
