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
import PanelToolbar from 'components/PanelToolbar';
import RefreshIndicatorLoading from 'components/RefreshIndicatorLoading';
import OrganizationTable from 'components/OrganizationTable/Loadable';
import Card from 'components/Card';
import CardHeader from 'components/CardHeader';
import CenterAlignedUltimatePagination from 'components/CenterAlignedUltimatePagination';
import CenterAlign from 'components/Align/CenterAlign';
import NoResultsFoundText from 'components/NoResultsFoundText';
import { getActiveLocations } from 'containers/Locations/actions';
import { getHealthcareServicesByOrganization } from 'containers/HealthcareServices/actions';
import {
  makeSelectOrganizations,
  makeSelectSearchOrganizationCurrentPage,
  makeSelectSearchOrganizationTotalNumberOfPages,
} from './selectors';
import reducer from './reducer';
import saga from './saga';
import { getOrganizations, initializeOrganizations, searchOrganizations } from './actions';
import { fromBackendToFrontendOrganization } from './mappings';
import messages from './messages';

export class Organizations extends React.PureComponent {
  constructor(props) {
    super(props);
    this.handleListPageClick = this.handleListPageClick.bind(this);
    this.handleSearch = this.handleSearch.bind(this);
    this.handleRowClick = this.handleRowClick.bind(this);
    this.handleSearchPageClick = this.handleSearchPageClick.bind(this);
    this.state = {
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

  componentWillMount() {
    this.props.initializeOrganizations();
  }

  handleListPageClick(currentPage) {
    this.setState({ listOrganizations: { currentPage } });
    this.props.getOrganizations(currentPage);
  }

  handleSearch(searchValue, showInactive, searchType) {
    this.setState({ searchOrganizations: { searchValue, showInactive, searchType } });
    this.props.searchOrganizations(searchValue, showInactive, searchType, this.state.searchOrganizations.currentPage);
  }

  handleRowClick({ id, name }) {
    const currentPage = 1;
    this.props.getActiveLocations(id, name, currentPage);
    this.props.getHealthcareServicesByOrganization(id, name, currentPage);
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
    return (
      <Card>
        <CardHeader title={<FormattedMessage {...messages.header} />} />
        <PanelToolbar addNewItem={addNewItem} onSearch={this.handleSearch} />
        {/* By default list all organizations */}
        {organizations.listOrganizations.loading && <RefreshIndicatorLoading />}
        {(!organizations.listOrganizations.loading && organizations.listOrganizations.data && organizations.listOrganizations.data.length > 0
            ? <div>
              <OrganizationTable
                organizations={organizations.listOrganizations.data.map(fromBackendToFrontendOrganization)}
                onRowClick={this.handleRowClick}
              />
              <CenterAlignedUltimatePagination
                currentPage={organizations.listOrganizations.currentPage}
                totalPages={organizations.listOrganizations.totalNumberOfPages}
                onChange={this.handleListPageClick}
              />
            </div> :
            (<CenterAlign>
              <NoResultsFoundText>No organizations found</NoResultsFoundText>
            </CenterAlign>)
        )}

        {/* Show search organization result */}
        {organizations.searchOrganizations.loading && <RefreshIndicatorLoading />}

        {(!organizations.searchOrganizations.loading && organizations.searchOrganizations.result && organizations.searchOrganizations.result.length > 0 &&
          <div>
            <OrganizationTable
              organizations={organizations.searchOrganizations.result.map(fromBackendToFrontendOrganization)}
              onRowClick={this.handleRowClick}
            />
            <CenterAlignedUltimatePagination
              currentPage={organizations.searchOrganizations.currentPage}
              totalPages={organizations.searchOrganizations.totalNumberOfPages}
              onChange={this.handleSearchPageClick}
            />
          </div>
        ) ||
        ((!organizations.searchOrganizations.loading && organizations.searchOrganizations.result && organizations.searchOrganizations.result.length === 0 &&
          <CenterAlign>
            <NoResultsFoundText>No organizations found</NoResultsFoundText>
          </CenterAlign>))
        }
      </Card>
    );
  }
}

Organizations.propTypes = {
  initializeOrganizations: PropTypes.func.isRequired,
  getOrganizations: PropTypes.func.isRequired,
  searchOrganizations: PropTypes.func.isRequired,
  getActiveLocations: PropTypes.func.isRequired,
  getHealthcareServicesByOrganization: PropTypes.func.isRequired,
  organizations: PropTypes.shape({
    searchOrganizations: PropTypes.shape({
      loading: PropTypes.bool.isRequired,
      currentPage: PropTypes.number.isRequired,
      totalNumberOfPages: PropTypes.number.isRequired,
      result: PropTypes.oneOfType([
        PropTypes.array,
        PropTypes.bool,
      ]),
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
    getActiveLocations: (organizationId, organizationName, currentPage) => dispatch(getActiveLocations(organizationId, organizationName, currentPage)),
    getHealthcareServicesByOrganization: (organizationId, organizationName, currentPage) => dispatch(getHealthcareServicesByOrganization(organizationId, organizationName, currentPage)),
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
