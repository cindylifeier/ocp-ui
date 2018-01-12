/**
 *
 * SearchBar
 *
 */

import React from 'react';
import PropTypes from 'prop-types';
import { FormattedMessage } from 'react-intl';
import { Checkbox, DropDownMenu, IconButton, MenuItem, TextField } from 'material-ui';
import { ActionSearch } from 'material-ui/svg-icons';

import messages from './messages';
import styles from './SearchBar.css';

const ENTER_KEY = 'Enter';

// Material UI Styles
const iconButtonStyle = { marginTop: '25px' };
const checkboxStyle = { marginTop: '40px' };
const dropdownMenuStyle = { marginTop: '15px' };

const SEARCH_BY_NAME = 'name';
const SEARCH_BY_ID = 'id';

class SearchBar extends React.PureComponent {

  constructor(props) {
    super(props);
    this.handleQueryChange = this.handleQueryChange.bind(this);
    this.handleSearch = this.handleSearch.bind(this);
    this.handleKeyPress = this.handleKeyPress.bind(this);
    this.handleCheckIncludeInactive = this.handleCheckIncludeInactive.bind(this);
    this.handleSearchTypeDropdown = this.handleSearchTypeDropdown.bind(this);
    this.isQueryValid = this.isQueryValid.bind(this);
    this.state = {
      query: '',
      includeInactive: false,
      searchType: SEARCH_BY_NAME,
    };
  }

  handleKeyPress(event) {
    if (event.key === ENTER_KEY) {
      this.handleSearch();
      event.preventDefault();
    }
  }

  handleQueryChange(event, newValue) {
    this.setState({ query: newValue });
  }

  handleSearch() {
    if (this.isQueryValid()) {
      const { query, includeInactive, searchType } = this.state;
      this.props.onSearch(query, includeInactive, searchType);
    }
  }

  handleCheckIncludeInactive() {
    this.setState((oldState) => ({ includeInactive: !oldState.includeInactive }));
  }

  handleSearchTypeDropdown(event, index, value) {
    this.setState({ searchType: value });
  }

  isQueryValid() {
    const { minimumLength } = this.props;
    const { query } = this.state;
    const queryTrimmed = query.trim();
    return queryTrimmed !== '' && queryTrimmed.length >= minimumLength;
  }

  render() {
    const { minimumLength } = this.props;
    const { query, includeInactive } = this.state;
    const queryValid = this.isQueryValid();
    return (
      <div className={styles.root}>
        <form>
          <div className={styles.grid}>
            <TextField
              errorText={query.trim() !== '' && !queryValid ?
                <FormattedMessage {...messages.validationMessage} values={{ minimumLength }} /> : ''}
              hintText={<FormattedMessage {...messages.hintText} />}
              floatingLabelText={<FormattedMessage {...messages.floatingLabelText} />}
              value={query}
              onChange={this.handleQueryChange}
              onKeyPress={this.handleKeyPress}
            />
            <DropDownMenu
              style={dropdownMenuStyle}
              value={this.state.searchType}
              onChange={this.handleSearchTypeDropdown}
            >
              <MenuItem value={SEARCH_BY_NAME} primaryText={<FormattedMessage {...messages.searchByName} />} />
              <MenuItem value={SEARCH_BY_ID} primaryText={<FormattedMessage {...messages.searchById} />} />
            </DropDownMenu>
            <Checkbox
              label={<FormattedMessage {...messages.includeInactive} />}
              checked={includeInactive}
              onCheck={this.handleCheckIncludeInactive}
              style={checkboxStyle}
            />
            <IconButton
              style={iconButtonStyle}
              tooltip={<FormattedMessage {...messages.buttonTooltip} />}
              disabled={!queryValid}
              onClick={this.handleSearch}
            >
              <ActionSearch />
            </IconButton>
          </div>

        </form>
      </div>
    );
  }
}

SearchBar.propTypes = {
  minimumLength: PropTypes.number.isRequired,
  onSearch: PropTypes.func.isRequired,
};

export default SearchBar;
