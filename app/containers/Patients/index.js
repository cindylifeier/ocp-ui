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
import UltimatePagination from 'react-ultimate-pagination-material-ui';
import { createStructuredSelector } from 'reselect';
import { compose } from 'redux';

import injectSaga from 'utils/injectSaga';
import injectReducer from 'utils/injectReducer';
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
import reducer from './reducer';
import saga from './saga';
import { initializePatients, loadPatientSearchResult } from './actions';
import PatientSearchResult from '../../components/PatientSearchResult';
import messages from './messages';
import { MANAGE_PATIENT_URL } from '../App/constants';
import { getCareTeams } from '../CareTeams/actions';
import Card from '../../components/Card';
import CardHeader from '../../components/CardHeader';
import StyledFlatButton from '../../components/StyledFlatButton';
import SearchBar from '../../components/SearchBar';
import { SEARCH_BAR_TEXT_LENGTH } from './constants';
import CenterAlign from '../../components/Align/CenterAlign';

export class Patients extends React.PureComponent {

  constructor(props) {
    super(props);
    this.state = {
      currentPage: 1,
    };
    this.handleSearch = this.handleSearch.bind(this);
    this.handleChangePage = this.handleChangePage.bind(this);
    this.handlePatientClick = this.handlePatientClick.bind(this);
  }

  componentWillMount() {
    this.props.initializePatients();
  }

  handlePatientClick({ id: searchValue, name: [{ firstName, lastName }] }) {
    const searchType = 'patientId';
    const query = { searchValue, searchType };
    this.props.getCareTeams(query, `${firstName} ${lastName}`);
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
        <PatientSearchResult {...searchResultProps} onPatientClick={this.handlePatientClick} />
        <CenterAlign>
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
        </CenterAlign>
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
    getCareTeams: (query, patientName) => dispatch(getCareTeams(query, patientName)),
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
