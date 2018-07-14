/**
 *
 * ManageRelatedPersonModal
 *
 */

import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { createStructuredSelector } from 'reselect';
import { compose } from 'redux';

import injectSaga from 'utils/injectSaga';
import injectReducer from 'utils/injectReducer';
import { DEFAULT_START_PAGE_NUMBER } from 'containers/App/constants';
import ManageRelatedPersonDialog from 'components/ManageRelatedPersonDialog';
import { searchRelatedPersons } from './actions';
import makeSelectManageRelatedPersonModal from './selectors';
import reducer from './reducer';
import saga from './saga';

export class ManageRelatedPersonModal extends React.Component { // eslint-disable-line react/prefer-stateless-function
  constructor(props) {
    super(props);
    this.state = {
      showSearchResult: false,
      searchRelatedPersons: {
        searchTerms: '',
      },
    };
    this.handleRelatedPersonsSearch = this.handleRelatedPersonsSearch.bind(this);
    this.handleSearchPageChange = this.handleSearchPageChange.bind(this);
    this.handleListPageChange = this.handleListPageChange.bind(this);
  }

  componentDidMount() {
    const careTeamId = this.props.careTeam.id;
    this.props.searchRelatedPersons(careTeamId, DEFAULT_START_PAGE_NUMBER);
  }

  handleRelatedPersonsSearch(searchTerms) {
    this.setState({
      showSearchResult: true,
      searchRelatedPersons: { searchTerms },
    });
    const careTeamId = this.props.careTeam.id;
    this.props.searchRelatedPersons(careTeamId, DEFAULT_START_PAGE_NUMBER, searchTerms);
  }

  handleSearchPageChange(currentPage) {
    const careTeamId = this.props.careTeam.id;
    this.props.searchRelatedPersons(careTeamId, currentPage, this.state.searchRelatedPersons.searchTerms);
  }

  handleListPageChange(currentPage) {
    const careTeamId = this.props.careTeam.id;
    this.props.searchRelatedPersons(careTeamId, currentPage);
  }

  render() {
    const { dialogOpen, onDialogClose, relatedPersons } = this.props;
    const relatedPersonsData = {
      loading: relatedPersons.loading,
      data: relatedPersons.data,
      currentPage: relatedPersons.currentPage,
      totalNumberOfPages: relatedPersons.totalNumberOfPages,
      currentPageSize: relatedPersons.currentPageSize,
      totalElements: relatedPersons.totalElements,
      handleChangePage: this.state.showSearchResult ? this.handleSearchPageChange : this.handleListPageChange,
    };
    return (
      <ManageRelatedPersonDialog
        dialogOpen={dialogOpen}
        onDialogClose={onDialogClose}
        onRelatedPersonsSearch={this.handleRelatedPersonsSearch}
        relatedPersonsData={relatedPersonsData}
      />
    );
  }
}

ManageRelatedPersonModal.propTypes = {
  dialogOpen: PropTypes.bool.isRequired,
  onDialogClose: PropTypes.func.isRequired,
  careTeam: PropTypes.shape({
    id: PropTypes.string.isRequired,
    name: PropTypes.string.isRequired,
    reasonCode: PropTypes.string,
    reasonDisplay: PropTypes.string,
    statusCode: PropTypes.string,
    statusDisplay: PropTypes.string,
    categoryCode: PropTypes.string,
    categoryDisplay: PropTypes.string,
    subjectId: PropTypes.string.isRequired,
    subjectFirstName: PropTypes.string.isRequired,
    subjectLastName: PropTypes.string.isRequired,
    startDate: PropTypes.string,
    endDate: PropTypes.string,
    participants: PropTypes.arrayOf(PropTypes.shape({
      roleCode: PropTypes.string,
      roleDisplay: PropTypes.string,
      memberId: PropTypes.string.isRequired,
      memberFirstName: PropTypes.string,
      memberLastName: PropTypes.string,
      memberName: PropTypes.string,
      memberType: PropTypes.string.isRequired,
      onBehalfOfId: PropTypes.string,
      onBehalfOfName: PropTypes.string,
    })),
  }).isRequired,
  searchRelatedPersons: PropTypes.func.isRequired,
  relatedPersons: PropTypes.shape({
    loading: PropTypes.bool.isRequired,
    currentPage: PropTypes.number.isRequired,
    totalNumberOfPages: PropTypes.number.isRequired,
    currentPageSize: PropTypes.number,
    totalElements: PropTypes.number,
    data: PropTypes.array,
    error: PropTypes.oneOfType([
      PropTypes.string,
      PropTypes.object,
      PropTypes.bool,
    ]),
  }),
};

const mapStateToProps = createStructuredSelector({
  relatedPersons: makeSelectManageRelatedPersonModal(),
});

function mapDispatchToProps(dispatch) {
  return {
    searchRelatedPersons: (careTeamId, currentPage, searchTerms) => dispatch(searchRelatedPersons(careTeamId, currentPage, searchTerms)),
  };
}

const withConnect = connect(mapStateToProps, mapDispatchToProps);

const withReducer = injectReducer({ key: 'manageRelatedPersonModal', reducer });
const withSaga = injectSaga({ key: 'manageRelatedPersonModal', saga });

export default compose(
  withReducer,
  withSaga,
  withConnect,
)(ManageRelatedPersonModal);
