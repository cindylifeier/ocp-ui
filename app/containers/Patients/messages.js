/*
 * Patients Messages
 *
 * This contains all the text for the Patients component.
 */
import { defineMessages } from 'react-intl';

export default defineMessages({
  header: {
    id: 'ocpui.containers.Patients.header',
    defaultMessage: 'Patients',
  },
  searchHeader: {
    id: 'ocpui.containers.Patients.searchHeader',
    defaultMessage: 'Search',
  },
  filterLabel: {
    id: 'ocpui.containers.Patients.filterLabel',
    defaultMessage: 'Include',
  },
  inactive: {
    id: 'ocpui.containers.Patients.checkbox.inactive',
    defaultMessage: 'Inactive',
  },
  searchTermsInvalid: {
    id: 'ocpui.containers.Patients.header',
    defaultMessage: 'Must be at least 3 characters long.',
  },
});
