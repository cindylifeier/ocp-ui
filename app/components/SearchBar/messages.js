/*
 * SearchBar Messages
 *
 * This contains all the text for the SearchBar component.
 */
import { defineMessages } from 'react-intl';

export default defineMessages({
  hintText: {
    id: 'ocpui.components.SearchBar.hintText',
    defaultMessage: 'Name or ID',
  },
  floatingLabelText: {
    id: 'ocpui.components.SearchBar.floatingLabelText',
    defaultMessage: 'Name or ID',
  },
  buttonTooltip: {
    id: 'ocpui.components.SearchBar.buttonTooltip',
    defaultMessage: 'Search',
  },
  validation: {
    minLength: {
      id: 'ocpui.components.SearchBar.validation.minLength',
      defaultMessage: 'Minimum {minimumLength} characters',
    },
    required: {
      id: 'ocpui.components.SearchBar.validation.required',
      defaultMessage: 'Required',
    },
    invalid: {
      id: 'ocpui.components.SearchBar.validation.invalid',
      defaultMessage: 'Invalid value',
    },
  },
  includeInactive: {
    id: 'ocpui.components.SearchBar.includeInactive',
    defaultMessage: 'Include inactive',
  },
  searchByName: {
    id: 'ocpui.components.SearchBar.searchByName',
    defaultMessage: 'By Name',
  },
  searchById: {
    id: 'ocpui.components.SearchBar.searchById',
    defaultMessage: 'By ID',
  },
});
