/**
 *
 * SearchBar
 *
 */

import React from 'react';
import PropTypes from 'prop-types';
import { FormattedMessage } from 'react-intl';
import { Checkbox, DropDownMenu, IconButton, MenuItem, TextField } from 'material-ui';

import messages from './messages';
import styles from './style.css';

// Material UI Styles
const iconButtonStyle = { top: '26px', height: '30px' };
const checkboxStyle = { marginTop: '40px', height: '30px' };
const dropdownMenuStyle = { top: '24px', height: '40px', width: '200px' };
const searchTextFieldStyle = { width: '100px' };

const SEARCH_BY_NAME = 'name';
const SEARCH_BY_ID = 'logicalId';

const ENTER_KEY = 'Enter';

const EMPTY_STRING = '';

class SearchBar extends React.PureComponent {

  constructor(props) {
    super(props);
    this.handleSearchValueChange = this.handleSearchValueChange.bind(this);
    this.handleSearch = this.handleSearch.bind(this);
    this.handleKeyPress = this.handleKeyPress.bind(this);
    this.handleCheckShowInactive = this.handleCheckShowInactive.bind(this);
    this.handleSearchTypeDropdown = this.handleSearchTypeDropdown.bind(this);
    this.isSearchValueValid = this.isSearchValueValid.bind(this);
    this.state = {
      searchValue: EMPTY_STRING,
      showInactive: false,
      searchType: SEARCH_BY_NAME,
    };
  }

  handleKeyPress(event) {
    if (event.key === ENTER_KEY) {
      this.handleSearch();
      event.preventDefault();
    }
  }

  handleSearchValueChange(event, newValue) {
    this.setState({ searchValue: newValue });
  }

  handleSearch() {
    if (this.isSearchValueValid()) {
      const { searchValue, showInactive, searchType } = this.state;
      this.props.onSearch(searchValue, showInactive, searchType);
    }
  }

  handleCheckShowInactive() {
    this.setState((oldState) => ({ showInactive: !oldState.showInactive }));
  }

  handleSearchTypeDropdown(event, index, value) {
    this.setState({ searchType: value });
  }

  isSearchValueValid() {
    const { minimumLength } = this.props;
    const { searchValue } = this.state;
    const searchValueTrimmed = searchValue.trim();
    return searchValueTrimmed !== EMPTY_STRING && searchValueTrimmed.length >= minimumLength;
  }

  render() {
    const { minimumLength } = this.props;
    const { searchValue, showInactive } = this.state;
    const searchValueValid = this.isSearchValueValid();
    return (
      <div className={styles.root}>
        <form>
          <div className={styles.gridContainer}>
            <div className={styles.gridItem}>
              <TextField
                style={searchTextFieldStyle}
                errorText={searchValue.trim() !== EMPTY_STRING && !searchValueValid ?
                  <FormattedMessage {...messages.validationMessage} values={{ minimumLength }} /> : EMPTY_STRING}
                hintText={<FormattedMessage {...messages.hintText} />}
                floatingLabelText={<FormattedMessage {...messages.floatingLabelText} />}
                value={searchValue}
                onChange={this.handleSearchValueChange}
                onKeyPress={this.handleKeyPress}
              />
            </div>
            <div className={styles.gridItem}>
              <DropDownMenu
                style={dropdownMenuStyle}
                value={this.state.searchType}
                onChange={this.handleSearchTypeDropdown}
              >
                <MenuItem value={SEARCH_BY_NAME} primaryText={<FormattedMessage {...messages.searchByName} />} />
                <MenuItem value={SEARCH_BY_ID} primaryText={<FormattedMessage {...messages.searchById} />} />
              </DropDownMenu>
            </div>
            <div className={styles.gridItem}>
              <Checkbox
                label={<FormattedMessage {...messages.includeInactive} />}
                checked={showInactive}
                onCheck={this.handleCheckShowInactive}
                style={checkboxStyle}
              />
            </div>
            <div className={styles.gridItem}>
              <IconButton
                style={iconButtonStyle}
                iconClassName="fa fa-search"
                tooltip={<FormattedMessage {...messages.buttonTooltip} />}
                disabled={!searchValueValid}
                onClick={this.handleSearch}
              />
            </div>
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
