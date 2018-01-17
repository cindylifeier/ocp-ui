/**
 *
 * Patients
 *
 */

import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { FormattedMessage } from 'react-intl';
import TextField from 'material-ui/TextField';
import IconButton from 'material-ui/IconButton';
import Checkbox from 'material-ui/Checkbox';
import DropDownMenu from 'material-ui/DropDownMenu';
import MenuItem from 'material-ui/MenuItem';
import UltimatePagination from 'react-ultimate-pagination-material-ui';
import { createStructuredSelector } from 'reselect';
import { compose } from 'redux';

import injectSaga from 'utils/injectSaga';
import injectReducer from 'utils/injectReducer';
import {
  makeSelectCurrentPage, makeSelectCurrentPageSize,
  makeSelectSearchError, makeSelectSearchLoading, makeSelectSearchResult, makeSelectTotalPages,
} from './selectors';
import reducer from './reducer';
import saga from './saga';
import { loadPatientSearchResult } from './actions';
import PatientSearchResult from '../../components/PatientSearchResult';
import styles from './styles.css';
import messages from './messages';
import { EMPTY_STRING, ENTER_KEY_CODE, SEARCH_TERM_MIN_LENGTH, SEARCH_TYPE } from './constants';

export class Patients extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      searchTerms: EMPTY_STRING,
      searchType: SEARCH_TYPE.NAME,
      includeInactive: false,
      currentPage: 1,
    };
    this.handleSearch = this.handleSearch.bind(this);
    this.handleChangeSearchTerms = this.handleChangeSearchTerms.bind(this);
    this.handleChangeSearchType = this.handleChangeSearchType.bind(this);
    this.handleChangeShowInactive = this.handleChangeShowInactive.bind(this);
    this.handleChangePage = this.handleChangePage.bind(this);
  }

  handleSearch() {
    if (this.state.searchTerms && this.state.searchTerms.trim().length > 0) {
      this.props.onSubmitForm(this.state.searchTerms, this.state.searchType, this.state.includeInactive, this.state.currentPage);
    }
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

  handleChangePage(newPage) {
    this.setState({ currentPage: newPage });
    this.props.onChangePage(this.state.searchTerms, this.state.searchType, this.state.includeInactive, newPage);
  }

  preventEnterSubmission(event) {
    if (event.which === ENTER_KEY_CODE) {
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
                  className={styles.searchField}
                  style={{ width: '45%' }}
                  hintText="Name or ID"
                  underlineShow={false}
                  errorText={this.state.searchTerms.trim().length > 0 && this.state.searchTerms.length < SEARCH_TERM_MIN_LENGTH ?
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
                  className={styles.checkBox}
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
                  disabled={this.state.searchTerms.trim() === EMPTY_STRING || this.state.searchTerms.length < SEARCH_TERM_MIN_LENGTH}
                  onClick={this.handleSearch}
                />
              </div>
            </div>
          </div>
        </form>
        <br />
        <PatientSearchResult {...searchResultProps} />
        <div className={styles.pagination}>
          {this.props.searchResult &&
          <UltimatePagination
            currentPage={this.props.currentPage}
            totalPages={this.props.totalPages}
            boundaryPagesRange={1}
            siblingPagesRange={1}
            hidePreviousAndNextPageLinks={false}
            hideFirstAndLastPageLinks={false}
            hideEllipsis={false}
            onChange={this.handleChangePage}
          />
          }
        </div>
      </div>
    );
  }
}

Patients.propTypes = {
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
  currentPage: PropTypes.number,
  totalPages: PropTypes.number,
  onChangePage: PropTypes.func,
};


const mapStateToProps = createStructuredSelector({
  searchResult: makeSelectSearchResult(),
  loading: makeSelectSearchLoading(),
  error: makeSelectSearchError(),
  currentPage: makeSelectCurrentPage(),
  currentPageSize: makeSelectCurrentPageSize(),
  totalPages: makeSelectTotalPages(),
});

function mapDispatchToProps(dispatch) {
  return {
    onSubmitForm: (searchTerms, searchType, includeInactive) => {
      const currentPage = 1;
      dispatch(loadPatientSearchResult(searchTerms, searchType, includeInactive, currentPage));
    },
    onChangePage: (searchTerms, searchType, includeInactive, currentPage) => dispatch(loadPatientSearchResult(searchTerms, searchType, includeInactive, currentPage)),
  };
}

const withConnect = connect(mapStateToProps, mapDispatchToProps);
const withReducer = injectReducer({ key: 'patients', reducer });
const withSaga = injectSaga({ key: 'patients', saga });

export default compose(
  withReducer,
  withSaga,
  withConnect,
)(Patients);
