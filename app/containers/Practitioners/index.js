/**
 *
 * Practitioners
 *
 */

import React from 'react';
import { Link } from 'react-router-dom';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { FormattedMessage } from 'react-intl';
import { createStructuredSelector } from 'reselect';
import { compose } from 'redux';
import { FlatButton, RaisedButton, SelectField } from 'material-ui';
import ContentAddCircle from 'material-ui/svg-icons/content/add-circle';
import TextField from 'material-ui/TextField';
import ActionSearch from 'material-ui/svg-icons/action/search';
import Checkbox from 'material-ui/Checkbox';
import { teal500, white } from 'material-ui/styles/colors';
import MenuItem from 'material-ui/MenuItem';
import UltimatePagination from 'react-ultimate-pagination-material-ui';

import injectSaga from 'utils/injectSaga';
import injectReducer from 'utils/injectReducer';
import PractitionerSearchResult from 'components/PractitionerSearchResult';
import Card from 'components/Card';
import { EMPTY_STRING, ENTER_KEY, MANAGE_PRACTITIONER_URL } from 'containers/App/constants';
import {
  makeSelectCurrentPage,
  makeSelectCurrentPageSize,
  makeSelectQueryIncludeInactive,
  makeSelectQuerySearchTerms,
  makeSelectQuerySearchType,
  makeSelectSearchError,
  makeSelectSearchLoading,
  makeSelectPractitionerSearchResult,
  makeSelectTotalPages,
} from './selectors';
import reducer from './reducer';
import saga from './saga';
import messages from './messages';
import styles from './styles.css';
import { SEARCH_TERM_MIN_LENGTH, SEARCH_TYPE } from './constants';
import { initializePractitioners, loadPractitionerSearchResult } from './actions';

export class Practitioners extends React.PureComponent { // eslint-disable-line react/prefer-stateless-function
  constructor(props) {
    super(props);
    this.state = {
      searchTerms: EMPTY_STRING,
      searchType: SEARCH_TYPE.NAME,
      includeInactive: false,
      currentPage: 1,
    };
    this.handleChangeSearchTerms = this.handleChangeSearchTerms.bind(this);
    this.handleChangeSearchType = this.handleChangeSearchType.bind(this);
    this.handleChangeShowInactive = this.handleChangeShowInactive.bind(this);
    this.handleChangePage = this.handleChangePage.bind(this);
    this.handleSearch = this.handleSearch.bind(this);
  }

  componentWillMount() {
    this.props.initializePractitioners();
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
    this.props.onChangePage(this.props.searchTerms, this.props.searchType, this.props.includeInactive, newPage);
  }

  handleSearch() {
    if (this.state.searchTerms && this.state.searchTerms.trim().length > 0) {
      this.props.onSubmitForm(this.state.searchTerms, this.state.searchType, this.state.includeInactive, this.state.currentPage);
    }
  }

  preventEnterSubmission(event) {
    if (event.key === ENTER_KEY) {
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
      <Card>
        <div className={styles.gridHeaderContainer}>
          <div className={styles.gridItem}>
            <div className={styles.header}>
              <FormattedMessage {...messages.header} />
            </div>
          </div>
          <div className={styles.gridItem}>
            <span className={styles.iconButton}>
              <FlatButton
                label="Create New"
                icon={<ContentAddCircle />}
                className={styles.font}
                containerElement={<Link to={MANAGE_PRACTITIONER_URL} />}
              />
            </span>
          </div>
        </div>
        <form>
          <div className={styles.searchSection}>
            <div className={styles.searchHeader}>
              <ActionSearch color={'#336666'} />
              <FormattedMessage {...messages.searchHeader} />
            </div>
            <div className={styles.searchGridContainer}>
              <SelectField
                fullWidth
                value={this.state.searchType}
                onChange={this.handleChangeSearchType}
              >
                <MenuItem value={SEARCH_TYPE.NAME} primaryText="By Name" />
                <MenuItem value={SEARCH_TYPE.IDENTIFIER} primaryText="By ID" />
              </SelectField>
              <TextField
                fullWidth
                hintText="Name or ID"
                underlineShow={false}
                errorText={this.state.searchTerms.trim().length > 0 && this.state.searchTerms.length < 3 ?
                  <FormattedMessage {...messages.searchTermsInvalid} values={{ SEARCH_TERM_MIN_LENGTH }} /> : ''}
                value={this.state.searchTerms}
                onChange={this.handleChangeSearchTerms}
                onKeyPress={this.preventEnterSubmission}
              />
            </div>
            <div className={styles.filterGridContainer}>
              <div>
                <FormattedMessage {...messages.filterLabel} />
              </div>
              <Checkbox
                label={<FormattedMessage {...messages.inactive} />}
                value={this.state.includeInactive}
                onCheck={this.handleChangeShowInactive}
              />
            </div>
            <div className={styles.buttonGridContainer}>
              <RaisedButton
                fullWidth
                label="Search"
                backgroundColor={teal500}
                labelColor={white}
                onClick={this.handleSearch}
                disabled={this.state.searchTerms === EMPTY_STRING || this.state.searchTerms.length < SEARCH_TERM_MIN_LENGTH}
              />
            </div>
          </div>
        </form>
        <br />
        <PractitionerSearchResult {...searchResultProps} />
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
      </Card>
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
    PropTypes.array,
    PropTypes.bool,
  ]),
  searchTerms: PropTypes.string,
  searchType: PropTypes.string,
  includeInactive: PropTypes.bool,
  currentPage: PropTypes.number,
  totalPages: PropTypes.number,
  onChangePage: PropTypes.func,
  onSubmitForm: PropTypes.func,
  initializePractitioners: PropTypes.func,
};

const mapStateToProps = createStructuredSelector({
  currentPage: makeSelectCurrentPage(),
  currentPageSize: makeSelectCurrentPageSize(),
  totalPages: makeSelectTotalPages(),
  searchTerms: makeSelectQuerySearchTerms(),
  searchType: makeSelectQuerySearchType(),
  includeInactive: makeSelectQueryIncludeInactive(),
  searchResult: makeSelectPractitionerSearchResult(),
  loading: makeSelectSearchLoading(),
  error: makeSelectSearchError(),
});

function mapDispatchToProps(dispatch) {
  return {
    onSubmitForm: (searchTerms, searchType, includeInactive) => {
      const currentPage = 1;
      dispatch(loadPractitionerSearchResult(searchTerms, searchType, includeInactive, currentPage));
    },
    onChangePage: (searchTerms, searchType, includeInactive, currentPage) => dispatch(loadPractitionerSearchResult(searchTerms, searchType, includeInactive, currentPage)),
    initializePractitioners: () => dispatch(initializePractitioners()),
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
