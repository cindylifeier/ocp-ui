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

class SearchBar extends React.PureComponent {

  constructor(props) {
    super(props);
    this.handleQueryChange = this.handleQueryChange.bind(this);
    this.handleSearch = this.handleSearch.bind(this);
    this.state = {
      query: '',
    };
  }

  handleQueryChange(event, newValue) {
    this.setState({ query: newValue });
  }

  handleSearch() {
    this.props.onSearch(this.state.query);
  }

  render() {
    const { minimumLength } = this.props;
    const { query } = this.state;
    const queryTrimmed = query.trim();
    return (
      <div className={styles.root}>
        <form>
          <div>
            <TextField

              hintText={<FormattedMessage {...messages.hintText} />}
              floatingLabelText={<FormattedMessage {...messages.floatingLabelText} />}
              value={query}
              onChange={this.handleQueryChange}
            />
            <IconButton
              tooltip={<FormattedMessage {...messages.buttonTooltip} />}
              disabled={queryTrimmed.length < minimumLength}
              onClick={this.handleSearch}
            >
              <ActionSearch />
            </IconButton>
          </div>

          {queryTrimmed !== '' && queryTrimmed.length < minimumLength &&
          <div>
            <span className={styles.validationMessage}>
              <FormattedMessage {...messages.validationMessage} values={{ minimumLength }} />
            </span>
          </div>
          }

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
