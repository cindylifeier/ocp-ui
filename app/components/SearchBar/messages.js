/*
 * SearchBar Messages
 *
 * This contains all the text for the SearchBar component.
 */
import { defineMessages } from 'react-intl';

export default defineMessages({
  hintText: {
    id: 'app.components.SearchBar.hintText',
    defaultMessage: 'Enter search criteria',
  },
  floatingLabelText: {
    id: 'app.components.SearchBar.floatingLabelText',
    defaultMessage: 'Search',
  },
  buttonTooltip: {
    id: 'app.components.SearchBar.buttonTooltip',
    defaultMessage: 'Search',
  },
  validationMessage: {
    id: 'app.components.SearchBar.validationMessage',
    defaultMessage: 'Minimum {minimumLength} characters',
  },
  includeInactive: {
    id: 'app.components.SearchBar.includeInactive',
    defaultMessage: 'Include inactive',
  },
  searchByName: {
    id: 'app.components.SearchBar.searchByName',
    defaultMessage: 'Search by Name',
  },
  searchById: {
    id: 'app.components.SearchBar.searchById',
    defaultMessage: 'Search by ID',
  },
});