/**
 *
 * Patients
 *
 */

import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { FormattedMessage } from 'react-intl';
import ContentAddCircle from 'material-ui/svg-icons/content/add-circle';
import { Link } from 'react-router-dom';
import { createStructuredSelector } from 'reselect';
import { compose } from 'redux';

import injectSaga from 'utils/injectSaga';
import injectReducer from 'utils/injectReducer';
import PatientSearchResult from 'components/PatientSearchResult';
import { MANAGE_PATIENT_URL } from 'containers/App/constants';
import { getCareTeams } from 'containers/CareTeams/actions';
import { getTasks } from 'containers/Tasks/actions';
import Card from 'components/Card';
import CardHeader from 'components/CardHeader';
import StyledFlatButton from 'components/StyledFlatButton';
import SearchBar from 'components/SearchBar';
import CenterAlignedUltimatePagination from 'components/CenterAlignedUltimatePagination';
import { getRelatedPersons } from 'containers/RelatedPersons/actions';
import { getPatient } from 'containers/App/actions';
import ConfirmPatientModal from 'components/ConfirmPatientModal';
import {
  makeSelectCurrentPage,
  makeSelectCurrentPageSize,
  makeSelectPatientSearchResult,
  makeSelectQueryIncludeInactive,
  makeSelectQuerySearchTerms,
  makeSelectQuerySearchType,
  makeSelectSearchError,
  makeSelectSearchLoading,
  makeSelectTotalPages,
} from './selectors';
import { initializePatients, loadPatientSearchResult } from './actions';
import { SEARCH_BAR_TEXT_LENGTH } from './constants';
import reducer from './reducer';
import saga from './saga';
import messages from './messages';

export class Patients extends React.PureComponent {

  constructor(props) {
    super(props);
    this.state = {
      currentPage: 1,
      selectedPatient: null,
      isPatientModalOpen: false,
    };
    this.handleSearch = this.handleSearch.bind(this);
    this.handleChangePage = this.handleChangePage.bind(this);
    this.handlePatientClick = this.handlePatientClick.bind(this);

    this.handlePatientViewDetailsClick = this.handlePatientViewDetailsClick.bind(this);
    this.handlePatientModalClose = this.handlePatientModalClose.bind(this);
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
    this.props.getTasks(query, `${firstName} ${lastName}`, searchValue);
    this.props.getPatient(searchValue);
    this.props.getRelatedPersons(searchValue, showInactive, currentPage);
  }

  handlePatientViewDetailsClick(patient) {
    this.setState({
      selectedPatient: patient,
      isPatientModalOpen: true,
    });
  }

  handlePatientModalOpen() {
    this.setState({ isPatientModalOpen: true });
  }

  handlePatientModalClose() {
    this.setState({ isPatientModalOpen: false });
  }

  handleSearch(searchTerms, includeInactive, searchType) {
    this.props.onSubmitForm(searchTerms, searchType, includeInactive, this.state.currentPage);
  }

  handleChangePage(newPage) {
    this.setState({ currentPage: newPage });
    this.props.onChangePage(this.props.searchTerms, this.props.searchType, this.props.includeInactive, newPage);
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
        <CardHeader title={<FormattedMessage {...messages.header} />}>
          <StyledFlatButton
            label={<FormattedMessage {...messages.buttonLabelCreateNew} />}
            icon={<ContentAddCircle />}
            containerElement={<Link to={MANAGE_PATIENT_URL} />}
          />
        </CardHeader>
        <SearchBar
          minimumLength={SEARCH_BAR_TEXT_LENGTH}
          onSearch={this.handleSearch}
        />
        <br />
        <PatientSearchResult
          {...searchResultProps}
          onPatientClick={this.handlePatientClick}
          onPatientViewDetailsClick={this.handlePatientViewDetailsClick}
        />
        {this.props.searchResult &&
        <CenterAlignedUltimatePagination
          currentPage={this.props.currentPage}
          totalPages={this.props.totalPages}
          onChange={this.handleChangePage}
        />
        }
        {/* TODO: Will move ConfirmPatientModal to upcoming tasks component*/}
        {this.state.selectedPatient &&
        <ConfirmPatientModal
          selectedPatient={this.state.selectedPatient}
          isPatientModalOpen={this.state.isPatientModalOpen}
          onPatientModalClose={this.handlePatientModalClose}
        />}
      </Card>
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
  getTasks: PropTypes.func.isRequired,
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
    getTasks: (query, patientName, patientId) => dispatch(getTasks(query, patientName, patientId)),
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
