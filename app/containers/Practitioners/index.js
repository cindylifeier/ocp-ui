/**
 *
 * Practitioners
 *
 */

import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { FormattedMessage } from 'react-intl';
import { createStructuredSelector } from 'reselect';
import { compose } from 'redux';
import TextField from 'material-ui/TextField';
import IconButton from 'material-ui/IconButton';
import Checkbox from 'material-ui/Checkbox';
import DropDownMenu from 'material-ui/DropDownMenu';
import MenuItem from 'material-ui/MenuItem';

import injectSaga from 'utils/injectSaga';
import injectReducer from 'utils/injectReducer';
import { makeSelectSearchError, makeSelectSearchLoading, makeSelectSearchResult } from './selectors';
import reducer from './reducer';
import saga from './saga';
import messages from './messages';
import styles from './Practitioners.css';
import { ENTER_KEY_CODE, SEARCH_TERM_MIN_LENGTH, SEARCH_TYPE } from './constants';
import PractitionerSearchResult from '../../components/PractitionerSearchResult';
import { loadPractitionerSearchResult } from './actions';

export class Practitioners extends React.PureComponent { // eslint-disable-line react/prefer-stateless-function
  constructor(props) {
    super(props);
    this.state = {
      searchTerms: '',
      searchType: SEARCH_TYPE.NAME,
      includeInactive: false,
    };
    this.handleChangeSearchTerms = this.handleChangeSearchTerms.bind(this);
    this.handleChangeSearchType = this.handleChangeSearchType.bind(this);
    this.handleChangeShowInactive = this.handleChangeShowInactive.bind(this);
    this.handleSearch = this.handleSearch.bind(this);
  }

  handleChangeSearchTerms(event, newValue) {
    this.setState({ searchTerms: newValue });
  }

  handleChangeSearchType(event, key, value) {
    this.setState({ searchType: value });
  }

  handleChangeShowInactive(event, checked) {
    this.setState({ includeInactive: checked });
  }

  handleSearch() {
    if (this.state.searchTerms && this.state.searchTerms.trim().length > 0) {
      this.props.onSubmitForm(this.state.searchTerms, this.state.searchType, this.state.includeInactive);
    }
  }

  preventEnterSubmission(event) {
    if (event.key === ENTER_KEY_CODE) {
      event.preventDefault();
    }
  }

  render() {
    const { loading, error, searchResult } = this.props;
    const searchResultProps = {
      loading,
      error,
      searchResult,
    };

    return (
      <div className={styles.wrapper}>
        <h3><FormattedMessage {...messages.header} /></h3>
        <form>
          <div className={styles.gridContainer}>
            <div className={styles.gridItem}>
              <div className={styles.centerElement}>
                <TextField
                  hintText="Name or ID"
                  underlineShow={false}
                  errorText={this.state.searchTerms.trim().length > 0 && this.state.searchTerms.length < 3 ?
                    <FormattedMessage {...messages.searchTermsInvalid} values={{ SEARCH_TERM_MIN_LENGTH }} /> : ''}
                  value={this.state.searchTerms}
                  onChange={this.handleChangeSearchTerms}
                  onKeyPress={this.preventEnterSubmission}
                />
              </div>
            </div>
            <div className={styles.gridItem}>
              <div className={styles.centerElement}>
                <DropDownMenu
                  value={this.state.searchType}
                  onChange={this.handleChangeSearchType}
                >
                  <MenuItem value={SEARCH_TYPE.NAME} primaryText="By Name" />
                  <MenuItem value={SEARCH_TYPE.IDENTIFIER} primaryText="By ID" />
                </DropDownMenu>
              </div>
            </div>
            <div className={styles.gridItem}>
              <div className={styles.centerElement}>
                <Checkbox
                  label={<FormattedMessage {...messages.inactive} />}
                  value={this.state.includeInactive}
                  onCheck={this.handleChangeShowInactive}
                />
              </div>
            </div>
            <div className={styles.gridItem}>
              <div className={styles.centerElement}>
                <IconButton
                  iconClassName="fa fa-search"
                  onClick={this.handleSearch}
                />
              </div>
            </div>
          </div>
        </form>
        <br />
        <PractitionerSearchResult {...searchResultProps} />
      </div>
    );
  }
}

Practitioners.propTypes = {
  loading: PropTypes.bool,
  error: PropTypes.oneOfType([
    PropTypes.object,
    PropTypes.bool,
  ]),
  searchResult: PropTypes.oneOfType([
    PropTypes.object,
    PropTypes.bool,
  ]),
  onSubmitForm: PropTypes.func,
};

const mapStateToProps = createStructuredSelector({
  searchResult: makeSelectSearchResult(),
  loading: makeSelectSearchLoading(),
  error: makeSelectSearchError(),
});

function mapDispatchToProps(dispatch) {
  return {
    onSubmitForm: (searchTerms, searchType, includeInactive) => {
      dispatch(loadPractitionerSearchResult(searchTerms, searchType, includeInactive));
    },
  };
}

const withConnect = connect(mapStateToProps, mapDispatchToProps);

const withReducer = injectReducer({ key: 'practitioners', reducer });
const withSaga = injectSaga({ key: 'practitioners', saga });

export default compose(
  withReducer,
  withSaga,
  withConnect,
)(Practitioners);
