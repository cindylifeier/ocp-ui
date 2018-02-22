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
import ActionSearch from 'material-ui/svg-icons/action/search';
import Checkbox from 'material-ui/Checkbox';
import MenuItem from 'material-ui/MenuItem';
import { FlatButton, RaisedButton, SelectField } from 'material-ui';
import ContentAddCircle from 'material-ui/svg-icons/content/add-circle';

import { Link } from 'react-router-dom';
import UltimatePagination from 'react-ultimate-pagination-material-ui';
import { createStructuredSelector } from 'reselect';
import { compose } from 'redux';
import { teal500, white } from 'material-ui/styles/colors';

import injectSaga from 'utils/injectSaga';
import injectReducer from 'utils/injectReducer';
import {
  makeSelectCurrentPage,
  makeSelectCurrentPageSize,
  makeSelectQueryIncludeInactive,
  makeSelectQuerySearchTerms,
  makeSelectQuerySearchType,
  makeSelectSearchError,
  makeSelectSearchLoading,
  makeSelectPatientSearchResult,
  makeSelectTotalPages,
} from './selectors';
import reducer from './reducer';
import saga from './saga';
import { initializePatients, loadPatientSearchResult } from './actions';
import PatientSearchResult from '../../components/PatientSearchResult';
import styles from './styles.css';
import messages from './messages';
import { SEARCH_TERM_MIN_LENGTH, SEARCH_TYPE } from './constants';
import { EMPTY_STRING, ENTER_KEY } from '../App/constants';
import { getCareTeams } from '../CareTeams/actions';
import { getRelatedPersons } from '../RelatedPersons/actions';
import { getPatient } from '../App/actions';

export class Patients extends React.PureComponent {
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
    this.handlePatientClick = this.handlePatientClick.bind(this);
  }

  componentWillMount() {
    this.props.initializePatients();
  }

  handlePatientClick({ id: searchValue, name: [{ firstName, lastName }] }) {
    const searchType = 'patientId';
    const query = { searchValue, searchType };
    const currentPage = 1;
    const showInactive = false;
    this.props.getCareTeams(query, `${firstName} ${lastName}`);
    this.props.getPatient(searchValue);
    this.props.getRelatedPersons(searchValue, showInactive, currentPage);
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
    this.props.onChangePage(this.props.searchTerms, this.props.searchType, this.props.includeInactive, newPage);
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
      <div className={styles.card}>
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
                containerElement={<Link to="/ocp-ui/manage-patient" />}
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
                errorText={this.state.searchTerms.trim().length > 0 && this.state.searchTerms.length < SEARCH_TERM_MIN_LENGTH ?
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
                disabled={this.state.searchTerms.trim() === EMPTY_STRING || this.state.searchTerms.length < SEARCH_TERM_MIN_LENGTH}
                onClick={this.handleSearch}
              />
            </div>
          </div>
        </form>
        <br />
        <PatientSearchResult {...searchResultProps} onPatientClick={this.handlePatientClick} />
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
    PropTypes.array,
    PropTypes.bool,
  ]),
  onSubmitForm: PropTypes.func.isRequired,
  currentPage: PropTypes.number,
  totalPages: PropTypes.number,
  onChangePage: PropTypes.func.isRequired,
  searchTerms: PropTypes.string,
  searchType: PropTypes.string,
  includeInactive: PropTypes.bool,
  initializePatients: PropTypes.func.isRequired,
  getCareTeams: PropTypes.func.isRequired,
  getRelatedPersons: PropTypes.func.isRequired,
  getPatient: PropTypes.func.isRequired,
};


const mapStateToProps = createStructuredSelector({
  searchResult: makeSelectPatientSearchResult(),
  loading: makeSelectSearchLoading(),
  error: makeSelectSearchError(),
  currentPage: makeSelectCurrentPage(),
  currentPageSize: makeSelectCurrentPageSize(),
  totalPages: makeSelectTotalPages(),
  searchTerms: makeSelectQuerySearchTerms(),
  searchType: makeSelectQuerySearchType(),
  includeInactive: makeSelectQueryIncludeInactive(),
});

function mapDispatchToProps(dispatch) {
  return {
    onSubmitForm: (searchTerms, searchType, includeInactive) => {
      const currentPage = 1;
      dispatch(loadPatientSearchResult(searchTerms, searchType, includeInactive, currentPage));
    },
    onChangePage: (searchTerms, searchType, includeInactive, currentPage) => dispatch(loadPatientSearchResult(searchTerms, searchType, includeInactive, currentPage)),
    initializePatients: () => dispatch(initializePatients()),
    getPatient: (patientId) => dispatch(getPatient(patientId)),
    getCareTeams: (query, patientName) => dispatch(getCareTeams(query, patientName)),
    getRelatedPersons: (patientId, showInActive, currentPage) => dispatch(getRelatedPersons(patientId, showInActive, currentPage)),
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
