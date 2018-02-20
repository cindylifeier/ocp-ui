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
import UltimatePagination from 'react-ultimate-pagination-material-ui';
import { FlatButton } from 'material-ui';
import ContentAddCircle from 'material-ui/svg-icons/content/add-circle';

import injectSaga from 'utils/injectSaga';
import injectReducer from 'utils/injectReducer';
import { makeSelectCurrentPage, makeSelectOrganizations, makeSelectTotalNumberOfPages } from './selectors';
import reducer from './reducer';
import saga from './saga';
import messages from './messages';
import { initializeOrganizations, loadOrganizations } from './actions';
import RefreshIndicatorLoading from '../../components/RefreshIndicatorLoading';
import styles from './styles.css';
import OrganizationTable from '../../components/OrganizationTable/Loadable';
import OrganizationTableRow from '../../components/OrganizationTableRow/Loadable';
import SearchBar from '../../components/SearchBar';
import { getActiveLocations } from '../Locations/actions';
import { fromBackendToFrontendOrganization } from './mappings';
import { MANAGE_ORGANIZATION_URL } from '../App/constants';
import { getHealthcareServicesByOrganization } from '../HealthcareServices/actions';
import Card from '../../components/Card';
import CardHeader from '../../components/CardHeader';
import CardHeaderContainerStyledGrid from './CardHeaderContainerStyledGrid';
import CardHeaderContainerStyledCell from './CardHeaderContainerStyledCell';

export class Organizations extends React.PureComponent {

  static SEARCH_BAR_TEXT_LENGTH = 3;
  static CARD_HEADER_COLUMNS = '1fr 150px';

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
    this.props.loadOrganizations(searchValue, showInactive, searchType, this.state.currentPage);
  }

  handleRowClick({ id, name }) {
    const currentPage = 1;
    this.props.getActiveLocations(id, name, currentPage);
    this.props.getHealthcareServicesByOrganization(id, name, currentPage);
  }

  handlePageClick(currentPage) {
    this.setState({ currentPage });
    this.props.loadOrganizations(this.state.searchValue, this.state.showInactive, this.state.searchType, currentPage);
  }

  render() {
    const { organizations } = this.props;
    return (
      <Card>
        <CardHeaderContainerStyledGrid columns={Organizations.CARD_HEADER_COLUMNS}>
          <CardHeaderContainerStyledCell>
            <CardHeader>
              <FormattedMessage {...messages.header} />
            </CardHeader>
          </CardHeaderContainerStyledCell>
          <CardHeaderContainerStyledCell>
            <span className={styles.iconButton}>
              <FlatButton
                label="Create New"
                icon={<ContentAddCircle />}
                className={styles.font}
                containerElement={<Link to={MANAGE_ORGANIZATION_URL} />}
              />
            </span>
          </CardHeaderContainerStyledCell>
        </CardHeaderContainerStyledGrid>
        <SearchBar
          minimumLength={Organizations.SEARCH_BAR_TEXT_LENGTH}
          onSearch={this.handleSearch}
        />

        {organizations.loading && <RefreshIndicatorLoading />}

        {(!organizations.loading && organizations.data && organizations.data.length > 0 &&
          <div>
            <OrganizationTable>
              {organizations.data.map(fromBackendToFrontendOrganization).map((org) => (
                <OrganizationTableRow
                  key={org.id}
                  {...org}
                  onRowClick={this.handleRowClick}
                />
              ))}
            </OrganizationTable>
            <div className={styles.textCenter}>
              <UltimatePagination
                currentPage={this.props.currentPage}
                totalPages={this.props.totalNumberOfPages}
                boundaryPagesRange={1}
                siblingPagesRange={1}
                hidePreviousAndNextPageLinks={false}
                hideFirstAndLastPageLinks={false}
                hideEllipsis={false}
                onChange={this.handlePageClick}
              />
            </div>
          </div>
        ) ||
        ((!organizations.loading && organizations.data && organizations.data.length === 0 &&
          <div className={styles.textCenter}>
            <span>No organizations found</span>
          </div>))
        }
      </Card>
    );
  }
}

Organizations.propTypes = {
  initializeOrganizations: PropTypes.func.isRequired,
  loadOrganizations: PropTypes.func.isRequired,
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
    loadOrganizations: (searchValue, showInactive, searchType, currentPage) => dispatch(loadOrganizations(searchValue, showInactive, searchType, currentPage)),
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
