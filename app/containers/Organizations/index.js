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

import injectSaga from 'utils/injectSaga';
import injectReducer from 'utils/injectReducer';
import { MANAGE_ORGANIZATION_URL } from 'containers/App/constants';
import { setOrganization } from 'containers/App/contextActions';
import RefreshIndicatorLoading from 'components/RefreshIndicatorLoading';
import OrganizationTable from 'components/OrganizationTable/Loadable';
import PanelToolbar from 'components/PanelToolbar';
import Card from 'components/Card';
import CardHeader from 'components/CardHeader';
import CenterAlign from 'components/Align/CenterAlign';
import CenterAlignedUltimatePagination from 'components/CenterAlignedUltimatePagination';
import NoResultsFoundText from 'components/NoResultsFoundText';
import {
  makeSelectOrganizations,
  makeSelectSearchOrganizationCurrentPage,
  makeSelectSearchOrganizationTotalNumberOfPages,
} from './selectors';
import reducer from './reducer';
import saga from './saga';
import messages from './messages';
import { getOrganizations, initializeOrganizations, searchOrganizations } from './actions';

export class Organizations extends React.PureComponent {
  constructor(props) {
    super(props);
    this.handleSearch = this.handleSearch.bind(this);
    this.handleRowClick = this.handleRowClick.bind(this);
    this.handleListPageClick = this.handleListPageClick.bind(this);
    this.handleSearchPageClick = this.handleSearchPageClick.bind(this);
    this.state = {
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
  }

  componentDidMount() {
    this.props.initializeOrganizations();
    const initialCurrentPage = 1;
    this.props.getOrganizations(initialCurrentPage);
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
    this.setState({ listOrganizations: { currentPage } });
    this.props.getOrganizations(currentPage);
  }

  handleSearchPageClick(currentPage) {
    this.setState({ currentPage });
    this.props.searchOrganizations(this.state.searchOrganizations.searchValue, this.state.searchOrganizations.showInactive, this.state.searchOrganizations.searchType, currentPage);
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
      handlePageClick: this.handleListPageClick,
    };
    if (this.state.isShowSearchResult) {
      organizationData = {
        loading: organizations.searchOrganizations.loading,
        data: organizations.searchOrganizations.result,
        currentPage: organizations.searchOrganizations.currentPage,
        totalNumberOfPages: organizations.searchOrganizations.totalNumberOfPages,
        handlePageClick: this.handleSearchPageClick,
      };
    }
    return (
      <Card>
        <CardHeader title={<FormattedMessage {...messages.header} />} />
        <PanelToolbar addNewItem={addNewItem} onSearch={this.handleSearch} />
        {organizationData.loading && <RefreshIndicatorLoading />}
        {(!organizationData.loading && organizationData.data && organizationData.data.length > 0
            ? <div>
              <OrganizationTable
                organizations={organizationData.data}
                onRowClick={this.handleRowClick}
              />
              <CenterAlignedUltimatePagination
                currentPage={organizationData.currentPage}
                totalPages={organizationData.totalNumberOfPages}
                onChange={organizationData.handlePageClick}
              />
            </div> :
            (<CenterAlign>
              <NoResultsFoundText>No organizations found</NoResultsFoundText>
            </CenterAlign>)
        )}
      </Card>
    );
  }
}

Organizations.propTypes = {
  initializeOrganizations: PropTypes.func.isRequired,
  setOrganization: PropTypes.func.isRequired,
  getOrganizations: PropTypes.func.isRequired,
  searchOrganizations: PropTypes.func.isRequired,
  organizations: PropTypes.shape({
    listOrganizations: PropTypes.shape({
      loading: PropTypes.bool.isRequired,
      currentPage: PropTypes.number.isRequired,
      totalNumberOfPages: PropTypes.number.isRequired,
      data: PropTypes.array,
    }),
    searchOrganizations: PropTypes.shape({
      loading: PropTypes.bool.isRequired,
      currentPage: PropTypes.number.isRequired,
      totalNumberOfPages: PropTypes.number.isRequired,
      result: PropTypes.array,
    }),
  }),
};

const mapStateToProps = createStructuredSelector({
  organizations: makeSelectOrganizations(),
  currentPage: makeSelectSearchOrganizationCurrentPage(),
  totalNumberOfPages: makeSelectSearchOrganizationTotalNumberOfPages(),
});

function mapDispatchToProps(dispatch) {
  return {
    initializeOrganizations: () => dispatch(initializeOrganizations()),
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
