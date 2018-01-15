/*
 * SearchBar Messages
 *
 * This contains all the text for the SearchBar component.
 */
import { defineMessages } from 'react-intl';

export default defineMessages({
  hintText: {
    id: 'app.components.SearchBar.hintText',
    defaultMessage: 'Name or ID',
  },
  floatingLabelText: {
    id: 'app.components.SearchBar.floatingLabelText',
    defaultMessage: 'Name or ID',
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
    defaultMessage: 'By Name',
  },
  searchById: {
    id: 'app.components.SearchBar.searchById',
    defaultMessage: 'By ID',
  },
});
