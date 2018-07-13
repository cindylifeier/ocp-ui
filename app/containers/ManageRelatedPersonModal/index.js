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
        searchValue: '',
        showInactive: false,
        searchType: 'name',
      },
    };
    this.handleRelatedPersonsSearch = this.handleRelatedPersonsSearch.bind(this);
    this.handleSearchPageChange = this.handleSearchPageChange.bind(this);
    this.handleListPageChange = this.handleListPageChange.bind(this);
  }

  componentDidMount() {
    this.props.searchRelatedPersons(DEFAULT_START_PAGE_NUMBER);
  }

  handleRelatedPersonsSearch(searchValue, showInactive, searchType) {
    this.setState({
      showSearchResult: true,
      searchPractitioners: { searchValue, showInactive, searchType },
    });
    this.props.searchRelatedPersons(DEFAULT_START_PAGE_NUMBER, searchValue, showInactive, searchType);
  }

  handleSearchPageChange(currentPage) {
    this.props.searchRelatedPersons(currentPage, this.state.searchRelatedPersons.searchValue, this.state.searchRelatedPersons.showInactive, this.state.searchRelatedPersons.searchType);
  }

  handleListPageChange(currentPage) {
    this.props.searchRelatedPersons(currentPage);
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
    searchRelatedPersons: (currentPage, searchValue, showInactive, searchType) => dispatch(searchRelatedPersons(currentPage, searchValue, showInactive, searchType)),
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
