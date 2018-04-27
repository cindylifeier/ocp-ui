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

import injectSaga from 'utils/injectSaga';
import injectReducer from 'utils/injectReducer';
import { MANAGE_ORGANIZATION_URL, OCP_ADMIN_ROLE_CODE } from 'containers/App/constants';
import { setOrganization } from 'containers/App/contextActions';
import { makeSelectOrganization } from 'containers/App/contextSelectors';
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
    };
    this.handleSearch = this.handleSearch.bind(this);
    this.handleRowClick = this.handleRowClick.bind(this);
    this.handleListPageClick = this.handleListPageClick.bind(this);
    this.handleSearchPageClick = this.handleSearchPageClick.bind(this);
    this.onSize = this.onSize.bind(this);
    this.handleSliderOpen = this.handleSliderOpen.bind(this);
    this.handleSliderClose = this.handleSliderClose.bind(this);
  }

  componentDidMount() {
    if (this.props.organization) {
      this.props.initializeOrganizations([this.props.organization]);
    } else {
      this.props.initializeOrganizations();
      const initialCurrentPage = 1;
      this.props.getOrganizations(initialCurrentPage);
    }
  }

  componentWillReceiveProps(nextProps) {
    const { organization } = this.props;
    const { organization: newOrganization } = nextProps;
    if (!isEqual(organization, newOrganization)) {
      this.props.initializeOrganizations([newOrganization]);
      this.setState({ ...Organizations.initialState });
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
    this.props.setOrganization(organization);
  }

  handleListPageClick(currentPage) {
    this.props.getOrganizations(currentPage);
  }

  handleSearchPageClick(currentPage) {
    this.props.searchOrganizations(this.state.searchOrganizations.searchValue, this.state.searchOrganizations.showInactive, this.state.searchOrganizations.searchType, currentPage);
  }

  handleSliderOpen() {
    this.setState({ openSlider: true });
  }

  handleSliderClose() {
    this.setState({ openSlider: false });
  }

  render() {
    const { organizations } = this.props;
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
        />
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
