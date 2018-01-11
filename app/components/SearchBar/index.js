/**
 *
 * SearchBar
 *
 */

import React from 'react';
import PropTypes from 'prop-types';
import { FormattedMessage } from 'react-intl';
import { IconButton, TextField } from 'material-ui';
import { ActionSearch } from 'material-ui/svg-icons';

import messages from './messages';
import styles from './SearchBar.css';

const ENTER_KEY = 'Enter';
const iconButtonStyle = { marginTop: '25px' };

class SearchBar extends React.PureComponent {

  constructor(props) {
    super(props);
    this.handleQueryChange = this.handleQueryChange.bind(this);
    this.handleSearch = this.handleSearch.bind(this);
    this.handleKeyPress = this.handleKeyPress.bind(this);
    this.isQueryValid = this.isQueryValid.bind(this);
    this.state = {
      query: '',
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
      this.props.onSearch(this.state.query);
    }
  }

  isQueryValid() {
    const { minimumLength } = this.props;
    const { query } = this.state;
    const queryTrimmed = query.trim();
    return queryTrimmed !== '' && queryTrimmed.length >= minimumLength;
  }

  render() {
    const { minimumLength } = this.props;
    const { query } = this.state;
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
