/*
 * Practitioners Messages
 *
 * This contains all the text for the Practitioners component.
 */
import { defineMessages } from 'react-intl';

export default defineMessages({
  header: {
    id: 'app.containers.Practitioners.header',
    defaultMessage: 'Practitioners',
  },
  searchTermsInvalid: {
    id: 'app.containers.Practitioners.header',
    defaultMessage: 'Must be at least {SEARCH_TERM_MIN_LENGTH} characters long.',
  },
  inactive: {
    id: 'app.containers.Locations.checkbox.inactive',
    defaultMessage: 'Include inactive',
  },
});
