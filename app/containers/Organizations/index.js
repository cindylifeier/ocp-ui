/**
 *
 * Organizations
 *
 */

import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { FormattedMessage } from 'react-intl';
import { createStructuredSelector } from 'reselect';
import { compose } from 'redux';
import isEqual from 'lodash/isEqual';
import isEmpty from 'lodash/isEmpty';

import injectSaga from 'utils/injectSaga';
import injectReducer from 'utils/injectReducer';
import { DEFAULT_START_PAGE_NUMBER, MANAGE_ORGANIZATION_URL, OCP_ADMIN_ROLE_CODE } from 'containers/App/constants';
import { setOrganization } from 'containers/App/contextActions';
import { makeSelectOrganization } from 'containers/App/contextSelectors';
import HorizontalAlignment from 'components/HorizontalAlignment';
import StyledFlatButton from 'components/StyledFlatButton';
import OrganizationTable from 'components/OrganizationTable/Loadable';
import PanelToolbar from 'components/PanelToolbar';
import InfoSection from 'components/InfoSection';
import OrganizationSlider from 'components/OrganizationSlider';
import { combineAddress, mapToTelecoms } from 'containers/App/helpers';
import makeSelectOrganizations from './selectors';
import reducer from './reducer';
import saga from './saga';
import { getOrganizations, initializeOrganizations, searchOrganizations } from './actions';
import { flattenOrganizationData } from './helpers';
import messages from './messages';

export class Organizations extends React.Component {
  static initialState = {
    relativeTop: 0,
    isShowSearchResult: false,
    listOrganizations: {
      currentPage: 1,
    },
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
      openSlider: false,
      showViewAllButton: !isEmpty(this.props.organization),
    };
    this.handleSearch = this.handleSearch.bind(this);
    this.handleRowClick = this.handleRowClick.bind(this);
    this.handleListPageClick = this.handleListPageClick.bind(this);
    this.handleSearchPageClick = this.handleSearchPageClick.bind(this);
    this.handleViewAll = this.handleViewAll.bind(this);
    this.onSize = this.onSize.bind(this);
    this.handleSliderOpen = this.handleSliderOpen.bind(this);
    this.handleSliderClose = this.handleSliderClose.bind(this);
  }

  componentDidMount() {
    if (this.props.organization) {
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

  onSize(size) {
    this.setState({ relativeTop: size.height });
  }

  handleSearch(searchValue, showInactive, searchType) {
    this.setState({
      isShowSearchResult: true,
      searchOrganizations: { searchValue, showInactive, searchType },
    });
    this.props.searchOrganizations(searchValue, showInactive, searchType, this.state.searchOrganizations.currentPage);
  }

  handleRowClick(organization) {
    const { onOrganizationClick } = this.props;
    if (onOrganizationClick) {
      onOrganizationClick(organization);
    } else {
      this.props.setOrganization(organization);
    }
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

  handleSliderOpen() {
    this.setState({ openSlider: true });
  }

  handleSliderClose() {
    this.setState({ openSlider: false });
  }

  render() {
    const { organizations, showSearchBarByDefault, hideToolbar } = this.props;
    const addNewItem = {
      labelName: <FormattedMessage {...messages.buttonLabelCreateNew} />,
      linkUrl: MANAGE_ORGANIZATION_URL,
    };
    // By initial to show listing organizations data
    let organizationData = {
      loading: organizations.listOrganizations.loading,
      data: organizations.listOrganizations.data,
      currentPage: organizations.listOrganizations.currentPage,
      totalNumberOfPages: organizations.listOrganizations.totalNumberOfPages,
      currentPageSize: organizations.listOrganizations.currentPageSize,
      totalElements: organizations.listOrganizations.totalElements,
      handlePageClick: this.handleListPageClick,
    };
    if (this.state.isShowSearchResult) {
      organizationData = {
        loading: organizations.searchOrganizations.loading,
        data: organizations.searchOrganizations.result,
        currentPage: organizations.searchOrganizations.currentPage,
        totalNumberOfPages: organizations.searchOrganizations.totalNumberOfPages,
        currentPageSize: organizations.searchOrganizations.currentPageSize,
        totalElements: organizations.searchOrganizations.totalElements,
        handlePageClick: this.handleSearchPageClick,
      };
    }
    return (
      <div>
        <PanelToolbar
          addNewItem={addNewItem}
          allowedAddNewItemRoles={OCP_ADMIN_ROLE_CODE}
          onSearch={this.handleSearch}
          onSize={this.onSize}
          showSearchBarByDefault={showSearchBarByDefault}
          hideToolbar={hideToolbar}
        />
        {this.state.showViewAllButton &&
        <InfoSection margin="10px 0">
          <HorizontalAlignment position="end">
            <StyledFlatButton color="primary" onClick={this.handleViewAll}>
              <FormattedMessage {...messages.viewAllButton} />
            </StyledFlatButton>
          </HorizontalAlignment>
        </InfoSection>
        }
        <InfoSection margin="0 0 10px 0">
          <OrganizationTable
            relativeTop={this.state.relativeTop}
            organizationData={organizationData}
            onRowClick={this.handleRowClick}
            flattenOrganizationData={flattenOrganizationData}
            onOrganizationViewDetails={this.handleSliderOpen}
            combineAddress={combineAddress}
            mapToTelecoms={mapToTelecoms}
          />
        </InfoSection>
        {this.props.organization &&
        <OrganizationSlider
          open={this.state.openSlider}
          onClose={this.handleSliderClose}
          organization={this.props.organization}
          flattenOrganizationData={flattenOrganizationData}
        />
        }
      </div>
    );
  }
}

Organizations.propTypes = {
  initializeOrganizations: PropTypes.func.isRequired,
  organization: PropTypes.object,
  setOrganization: PropTypes.func.isRequired,
  getOrganizations: PropTypes.func.isRequired,
  searchOrganizations: PropTypes.func.isRequired,
  organizations: PropTypes.shape({
    listOrganizations: PropTypes.shape({
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
    searchOrganizations: PropTypes.shape({
      loading: PropTypes.bool.isRequired,
      currentPage: PropTypes.number.isRequired,
      totalNumberOfPages: PropTypes.number.isRequired,
      result: PropTypes.array,
      error: PropTypes.oneOfType([
        PropTypes.string,
        PropTypes.object,
        PropTypes.bool,
      ]),
    }),
  }),
  onOrganizationClick: PropTypes.func,
  showSearchBarByDefault: PropTypes.bool,
  hideToolbar: PropTypes.bool,
};

Organizations.defaultProps = {
  showSearchBarByDefault: false,
  hideToolbar: false,
};

const mapStateToProps = createStructuredSelector({
  organizations: makeSelectOrganizations(),
  organization: makeSelectOrganization(),
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
