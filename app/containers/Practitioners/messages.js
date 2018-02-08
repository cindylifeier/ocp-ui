/*
 * Practitioners Messages
 *
 * This contains all the text for the Practitioners component.
 */
import { defineMessages } from 'react-intl';

export default defineMessages({
  header: {
    id: 'ocpui.containers.Practitioners.header',
    defaultMessage: 'Practitioners',
  },
  searchHeader: {
    id: 'ocpui.containers.Patients.searchHeader',
    defaultMessage: 'Search',
  },
  filterLabel: {
    id: 'ocpui.containers.Patients.filterLabel',
    defaultMessage: 'Include',
  },
  searchTermsInvalid: {
    id: 'ocpui.containers.Practitioners.header',
    defaultMessage: 'Must be at least {SEARCH_TERM_MIN_LENGTH} characters long.',
  },
  inactive: {
    id: 'ocpui.containers.Locations.checkbox.inactive',
    defaultMessage: 'Include inactive',
  },
});
