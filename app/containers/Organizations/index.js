/**
 *
 * Organizations
 *
 */

import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { createStructuredSelector } from 'reselect';
import { compose } from 'redux';
import isEqual from 'lodash/isEqual';
import isEmpty from 'lodash/isEmpty';

import injectSaga from 'utils/injectSaga';
import injectReducer from 'utils/injectReducer';
import { DEFAULT_START_PAGE_NUMBER, OCP_ADMIN_ROLE_CODE } from 'containers/App/constants';
import { setOrganization } from 'containers/App/contextActions';
import { makeSelectOrganization, makeSelectUser } from 'containers/App/contextSelectors';
import makeSelectOrganizations from './selectors';
import reducer from './reducer';
import saga from './saga';
import { getOrganizations, initializeOrganizations, searchOrganizations } from './actions';
import DefaultViewComponent from './DefaultViewComponent';

export class Organizations extends React.Component {
  static initialState = {
    isShowSearchResult: false,
    searchOrganizations: {
      currentPage: 1,
      searchValue: '',
      showInactive: false,
      searchType: 'name',
    },
  };

  constructor(props) {
    super(props);
    this.state = {
      ...Organizations.initialState,
      showViewAllButton: !isEmpty(this.props.organization),
    };
    this.handleSearch = this.handleSearch.bind(this);
    this.handleListPageClick = this.handleListPageClick.bind(this);
    this.handleSearchPageClick = this.handleSearchPageClick.bind(this);
    this.handleViewAll = this.handleViewAll.bind(this);
  }

  componentDidMount() {
    if (this.props.organization && isEqual(this.props.user.role, OCP_ADMIN_ROLE_CODE)) {
      this.props.initializeOrganizations([this.props.organization]);
    } else {
      this.props.initializeOrganizations();
      this.props.getOrganizations(DEFAULT_START_PAGE_NUMBER);
    }
  }

  componentWillReceiveProps(nextProps) {
    const { organization } = this.props;
    const { organization: newOrganization } = nextProps;
    if (!isEqual(organization, newOrganization)) {
      this.props.initializeOrganizations([newOrganization]);
      this.setState({ ...Organizations.initialState });
      this.setState({ showViewAllButton: true });
    }
  }

  handleSearch(searchValue, showInactive, searchType) {
    this.setState({
      isShowSearchResult: true,
      searchOrganizations: { searchValue, showInactive, searchType },
    });
    this.props.searchOrganizations(searchValue, showInactive, searchType, this.state.searchOrganizations.currentPage);
  }

  handleListPageClick(currentPage) {
    this.props.getOrganizations(currentPage);
  }

  handleSearchPageClick(currentPage) {
    this.props.searchOrganizations(this.state.searchOrganizations.searchValue, this.state.searchOrganizations.showInactive, this.state.searchOrganizations.searchType, currentPage);
  }

  handleViewAll() {
    this.props.getOrganizations(DEFAULT_START_PAGE_NUMBER);
    this.setState({ showViewAllButton: false });
  }

  render() {
    const { organizations } = this.props;
    const organizationData = {
      loading: organizations.loading,
      data: organizations.data,
      currentPage: organizations.currentPage,
      totalNumberOfPages: organizations.totalNumberOfPages,
      currentPageSize: organizations.currentPageSize,
      totalElements: organizations.totalElements,
      handlePageClick: this.state.isShowSearchResult ? this.handleSearchPageClick : this.handleListPageClick,
    };

    const viewComponentProps = {
      onSearch: this.handleSearch,
      onSetOrganization: this.props.setOrganization,
      onViewAll: this.handleViewAll,
      isShowViewAllButton: this.state.showViewAllButton,
      organization: this.props.organization,
      organizationData,
    };
    const Component = this.props.component;
    return (
      <Component {...viewComponentProps} />
    );
  }
}

Organizations.propTypes = {
  component: PropTypes.oneOfType([PropTypes.func]).isRequired,
  user: PropTypes.shape({
    role: PropTypes.string.isRequired,
  }).isRequired,
  initializeOrganizations: PropTypes.func.isRequired,
  organization: PropTypes.object,
  setOrganization: PropTypes.func.isRequired,
  getOrganizations: PropTypes.func.isRequired,
  searchOrganizations: PropTypes.func.isRequired,
  organizations: PropTypes.shape({
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

Organizations.defaultProps = {
  component: DefaultViewComponent,
};

const mapStateToProps = createStructuredSelector({
  organizations: makeSelectOrganizations(),
  organization: makeSelectOrganization(),
  user: makeSelectUser(),
});

function mapDispatchToProps(dispatch) {
  return {
    initializeOrganizations: (organizations) => dispatch(initializeOrganizations(organizations)),
    getOrganizations: (currentPage) => dispatch(getOrganizations(currentPage)),
    searchOrganizations: (searchValue, showInactive, searchType, currentPage) => dispatch(searchOrganizations(searchValue, showInactive, searchType, currentPage)),
    setOrganization: (organization) => dispatch(setOrganization(organization)),
  };
}

const withConnect = connect(mapStateToProps, mapDispatchToProps);

const withReducer = injectReducer({ key: 'organizations', reducer });
const withSaga = injectSaga({ key: 'organizations', saga });

export default compose(
  withReducer,
  withSaga,
  withConnect,
)(Organizations);
