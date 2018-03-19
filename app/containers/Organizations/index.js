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
import { Link } from 'react-router-dom';
import ContentAddCircle from 'material-ui/svg-icons/content/add-circle';

import injectSaga from 'utils/injectSaga';
import injectReducer from 'utils/injectReducer';
import RefreshIndicatorLoading from 'components/RefreshIndicatorLoading';
import OrganizationTable from 'components/OrganizationTable/Loadable';
import SearchBar from 'components/SearchBar';
import Card from 'components/Card';
import CardHeader from 'components/CardHeader';
import StyledFlatButton from 'components/StyledFlatButton';
import CenterAlign from 'components/Align/CenterAlign';
import CenterAlignedUltimatePagination from 'components/CenterAlignedUltimatePagination';
import NoResultsFoundText from 'components/NoResultsFoundText';
import { getActiveLocations } from 'containers/Locations/actions';
import { MANAGE_ORGANIZATION_URL } from 'containers/App/constants';
import { getHealthcareServicesByOrganization } from 'containers/HealthcareServices/actions';
import { makeSelectSearchOrganizationCurrentPage, makeSelectOrganizations, makeSelectSearchOrganizationTotalNumberOfPages } from './selectors';
import reducer from './reducer';
import saga from './saga';
import messages from './messages';
import { initializeOrganizations, searchOrganizations } from './actions';
import { fromBackendToFrontendOrganization } from './mappings';

export class Organizations extends React.PureComponent {
  constructor(props) {
    super(props);
    this.handleSearch = this.handleSearch.bind(this);
    this.handleRowClick = this.handleRowClick.bind(this);
    this.handlePageClick = this.handlePageClick.bind(this);
    this.state = {
      currentPage: 1,
      searchValue: '',
      showInactive: false,
      searchType: 'name',
    };
  }

  componentWillMount() {
    this.props.initializeOrganizations();
  }

  handleSearch(searchValue, showInactive, searchType) {
    this.setState({ searchValue, showInactive, searchType });
    this.props.searchOrganizations(searchValue, showInactive, searchType, this.state.currentPage);
  }

  handleRowClick({ id, name }) {
    const currentPage = 1;
    this.props.getActiveLocations(id, name, currentPage);
    this.props.getHealthcareServicesByOrganization(id, name, currentPage);
  }

  handlePageClick(currentPage) {
    this.setState({ currentPage });
    this.props.searchOrganizations(this.state.searchValue, this.state.showInactive, this.state.searchType, currentPage);
  }

  render() {
    const { organizations } = this.props;
    return (
      <Card>
        <CardHeader title={<FormattedMessage {...messages.header} />}>
          <StyledFlatButton
            label={<FormattedMessage {...messages.buttonLabelCreateNew} />}
            icon={<ContentAddCircle />}
            containerElement={<Link to={MANAGE_ORGANIZATION_URL} />}
          />
        </CardHeader>

        <SearchBar onSearch={this.handleSearch} />

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
              onChange={this.handlePageClick}
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
  searchOrganizations: PropTypes.func.isRequired,
  getActiveLocations: PropTypes.func.isRequired,
  getHealthcareServicesByOrganization: PropTypes.func.isRequired,
  organizations: PropTypes.shape({
    searchOrganizations: PropTypes.shape({
      loading: PropTypes.bool.isRequired,
      currentPage: PropTypes.number.isRequired,
      totalNumberOfPages: PropTypes.number.isRequired,
      result: PropTypes.array.isRequired,
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
