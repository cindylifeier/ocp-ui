/**
 *
 * AssignHealthCareServiceToLocationPage
 *
 */

import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { Helmet } from 'react-helmet';
import { FormattedMessage } from 'react-intl';
import { createStructuredSelector } from 'reselect';
import { compose } from 'redux';
import find from 'lodash/find';
import isEmpty from 'lodash/isEmpty';
import Divider from 'material-ui/Divider';
import UltimatePagination from 'react-ultimate-pagination-material-ui';
import injectSaga from 'utils/injectSaga';
import injectReducer from 'utils/injectReducer';
import {
  makeSelectCurrentPage,
  makeSelectHealthcareServices, makeSelectQueryError,
  makeSelectQueryLoading, makeSelectTotalNumberOfPages,
} from './selectors';
import reducer from './reducer';
import saga from './saga';
import styles from './styles.css';
import messages from './messages';
import RefreshIndicatorLoading from '../../components/RefreshIndicatorLoading';
import HealthcareServiceTable from '../../components/HealthcareServiceTable';
import {
  getHealthcareServicesByOrganization, initializeAssignHealthCareServiceToLocationPage,
} from './actions';
import { makeSelectLocations, makeSelectOrganization } from '../Locations/selectors';


export class AssignHealthCareServiceToLocationPage extends React.PureComponent { // eslint-disable-line react/prefer-stateless-function
  constructor(props) {
    super(props);
    this.state = {
      locationId: this.props.match.params.id,
      currentPage: 1,
    };
    this.handlePageClick = this.handlePageClick.bind(this);
  }

  componentDidMount() {
    this.props.initializeAssignHealthCareServiceToLocationPage();
    this.props.getHealthcareServices(this.props.organization.id, this.props.organization.name, 1, false);
  }

  handlePageClick(currentPage) {
    this.props.getHealthcareServices(this.props.organization.id, this.props.organization.name, currentPage, false);
  }

  render() {
    const logicalId = this.props.match.params.id;
    const selectedLocation = find(this.props.location, { logicalId });
    const { loading, healthcareServices, organization } = this.props;
    return (
      <div className={styles.root}>
        <Helmet>
          <title>Assign Healthcare Service To the Location</title>
          <meta name="description" content="Description of AssignHealthCareServiceToLocationPage" />
        </Helmet>
        <div className={styles.header}>
          <FormattedMessage {...messages.header} />
        </div>
        <Divider />

        <div className={styles.card}>
          {isEmpty(organization) &&
          <h4><FormattedMessage {...messages.organizationNotSelected} /></h4>}

          {organization && selectedLocation && <div>
            <div><strong>Organization:</strong> {organization.name}</div>
            <div><strong>Location:</strong> {selectedLocation.name}</div>
          </div>
          }

          {loading &&
          <RefreshIndicatorLoading />}

          {!loading && !isEmpty(organization) && isEmpty(healthcareServices) &&
          <h4><FormattedMessage {...messages.noHealthcareServicesFound} /></h4>
          }

          {!loading && !isEmpty(organization) && !isEmpty(healthcareServices) && healthcareServices.length > 0 &&
          <div className={styles.textCenter}>
            <HealthcareServiceTable elements={healthcareServices} showAssigned />
            <UltimatePagination
              currentPage={this.props.currentPage}
              totalPages={this.props.totalPages}
              boundaryPagesRange={1}
              siblingPagesRange={1}
              hidePreviousAndNextPageLinks={false}
              hideFirstAndLastPageLinks={false}
              hideEllipsis={false}
              onChange={this.handlePageClick}
            />
          </div>
          }
        </div>
      </div>
    );
  }
}

AssignHealthCareServiceToLocationPage.propTypes = {
  match: PropTypes.object,
  getHealthcareServices: PropTypes.func,
  initializeAssignHealthCareServiceToLocationPage: PropTypes.func,
  healthcareServices: PropTypes.array,
  organization: PropTypes.object,
  loading: PropTypes.bool,
  currentPage: PropTypes.number,
  totalPages: PropTypes.number,
  location: PropTypes.array,
};

const mapStateToProps = createStructuredSelector({
  organization: makeSelectOrganization(),
  location: makeSelectLocations(),
  loading: makeSelectQueryLoading(),
  error: makeSelectQueryError(),
  currentPage: makeSelectCurrentPage(),
  totalPages: makeSelectTotalNumberOfPages(),
  healthcareServices: makeSelectHealthcareServices(),
});

function mapDispatchToProps(dispatch) {
  return {
    initializeAssignHealthCareServiceToLocationPage: () => dispatch(initializeAssignHealthCareServiceToLocationPage()),
    getHealthcareServices: (organizationId, organizationName, currentPage, includeInactive) => dispatch(getHealthcareServicesByOrganization(organizationId, organizationName, currentPage, includeInactive)),
  };
}

const withConnect = connect(mapStateToProps, mapDispatchToProps);

const withReducer = injectReducer({ key: 'assignHealthCareServiceToLocationPage', reducer });
const withSaga = injectSaga({ key: 'assignHealthCareServiceToLocationPage', saga });

export default compose(
  withReducer,
  withSaga,
  withConnect,
)(AssignHealthCareServiceToLocationPage);
