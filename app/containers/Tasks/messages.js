/*
 * Tasks Messages
 *
 * This contains all the text for the Tasks component.
 */
import { defineMessages } from 'react-intl';

export default defineMessages({
  header: {
    id: 'ocpui.containers.Tasks.header',
    defaultMessage: 'Tasks',
  },
  patientNotSelected: {
    id: 'ocpui.containers.Tasks.patientNotSelected',
    defaultMessage: 'No tasks loaded. Please select a patient to view his/her tasks.',
  },
  noTasksFound: {
    id: 'ocpui.containers.Tasks.noTasksFound',
    defaultMessage: 'No tasks found.',
  },
});
