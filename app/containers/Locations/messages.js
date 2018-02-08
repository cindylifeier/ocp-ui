/*
 * Locations Messages
 *
 * This contains all the text for the Locations component.
 */
import { defineMessages } from 'react-intl';

export default defineMessages({
  header: {
    id: 'ocpui.containers.Locations.header',
    defaultMessage: 'This is Locations container !',
  },
  filterLabel: {
    id: 'ocpui.containers.Patients.filterLabel',
    defaultMessage: 'Include',
  },
  inactive: {
    id: 'ocpui.containers.Locations.checkbox.inactive',
    defaultMessage: 'Inactive',
  },
  suspended: {
    id: 'ocpui.containers.Locations.checkbox.suspended',
    defaultMessage: 'Suspended',
  },
});
