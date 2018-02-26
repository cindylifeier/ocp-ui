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
import { makeSelectCurrentPage, makeSelectOrganizations, makeSelectTotalNumberOfPages } from './selectors';
import reducer from './reducer';
import saga from './saga';
import messages from './messages';
import { initializeOrganizations, getOrganizations } from './actions';
import RefreshIndicatorLoading from '../../components/RefreshIndicatorLoading';
import OrganizationTable from '../../components/OrganizationTable/Loadable';
import SearchBar from '../../components/SearchBar';
import { getActiveLocations } from '../Locations/actions';
import { fromBackendToFrontendOrganization } from './mappings';
import { MANAGE_ORGANIZATION_URL } from '../App/constants';
import { getHealthcareServicesByOrganization } from '../HealthcareServices/actions';
import Card from '../../components/Card';
import CardHeader from '../../components/CardHeader';
import StyledFlatButton from '../../components/StyledFlatButton';
import CenterAlign from '../../components/Align/CenterAlign';
import CenterAlignedUltimatePagination from '../../components/CenterAlignedUltimatePagination';

export class Organizations extends React.PureComponent {

  static SEARCH_BAR_TEXT_LENGTH = 3;

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
    this.props.getOrganizations(searchValue, showInactive, searchType, this.state.currentPage);
  }

  handleRowClick({ id, name }) {
    const currentPage = 1;
    this.props.getActiveLocations(id, name, currentPage);
    this.props.getHealthcareServicesByOrganization(id, name, currentPage);
  }

  handlePageClick(currentPage) {
    this.setState({ currentPage });
    this.props.getOrganizations(this.state.searchValue, this.state.showInactive, this.state.searchType, currentPage);
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
        <SearchBar
          minimumLength={Organizations.SEARCH_BAR_TEXT_LENGTH}
          onSearch={this.handleSearch}
        />

        {organizations.loading && <RefreshIndicatorLoading />}

        {(!organizations.loading && organizations.data && organizations.data.length > 0 &&
          <div>
            <OrganizationTable
              organizations={organizations.data.map(fromBackendToFrontendOrganization)}
              onRowClick={this.handleRowClick}
            />
            <CenterAlignedUltimatePagination
              currentPage={this.props.currentPage}
              totalPages={this.props.totalNumberOfPages}
              onChange={this.handlePageClick}
            />
          </div>
        ) ||
        ((!organizations.loading && organizations.data && organizations.data.length === 0 &&
          <CenterAlign>
            <span>No organizations found</span>
          </CenterAlign>))
        }
      </Card>
    );
  }
}

Organizations.propTypes = {
  initializeOrganizations: PropTypes.func.isRequired,
  getOrganizations: PropTypes.func.isRequired,
  getActiveLocations: PropTypes.func.isRequired,
  getHealthcareServicesByOrganization: PropTypes.func.isRequired,
  currentPage: PropTypes.number.isRequired,
  totalNumberOfPages: PropTypes.number.isRequired,
  organizations: PropTypes.shape({
    data: PropTypes.array.isRequired,
    loading: PropTypes.bool.isRequired,
  }),
};

const mapStateToProps = createStructuredSelector({
  organizations: makeSelectOrganizations(),
  currentPage: makeSelectCurrentPage(),
  totalNumberOfPages: makeSelectTotalNumberOfPages(),
});

function mapDispatchToProps(dispatch) {
  return {
    initializeOrganizations: () => dispatch(initializeOrganizations()),
    getOrganizations: (searchValue, showInactive, searchType, currentPage) => dispatch(getOrganizations(searchValue, showInactive, searchType, currentPage)),
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
