/*
 * Locations Messages
 *
 * This contains all the text for the Locations component.
 */
import { defineMessages } from 'react-intl';

export default defineMessages({
  header: {
    id: 'app.containers.Locations.header',
    defaultMessage: 'This is Locations container !',
  },
  inactive: {
    id: 'app.containers.Locations.checkbox.inactive',
    defaultMessage: 'Include Inactive',
  },
  suspended: {
    id: 'app.containers.Locations.checkbox.suspended',
    defaultMessage: 'Include Suspended',
  },
});
