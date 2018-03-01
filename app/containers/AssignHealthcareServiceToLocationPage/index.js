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
import Dialog from 'material-ui/Dialog';
import RefreshIndicatorLoading from 'components/RefreshIndicatorLoading';
import HealthcareServiceTable from 'components/HealthcareServiceTable';
import StyledFlatButton from 'components/StyledFlatButton';
import { makeSelectLocations, makeSelectOrganization } from 'containers/Locations/selectors';
import {
  makeSelectCurrentPage,
  makeSelectHealthcareServices,
  makeSelectQueryError,
  makeSelectQueryLoading,
  makeSelectTotalNumberOfPages,
} from './selectors';
import reducer from './reducer';
import saga from './saga';
import styles from './styles.css';
import messages from './messages';
import {
  getHealthcareServicesLocationAssignment,
  initializeAssignHealthCareServiceToLocationPage,
  markHealthcareServiceAsAssigned,
  unassignHealthcareServicesLocationAssignment,
  updateHealthcareServicesLocationAssignment,
} from './actions';

export class AssignHealthCareServiceToLocationPage extends React.PureComponent { // eslint-disable-line react/prefer-stateless-function
  constructor(props) {
    super(props);
    this.state = {
      currentPage: 1,
      open: false,
      selectedHealthCareServiceName: '',
      selectedLocationName: '',
      healthcareServiceLogicalId: '',
    };
    this.handlePageClick = this.handlePageClick.bind(this);
    this.onCheckAssignedCheckbox = this.onCheckAssignedCheckbox.bind(this);
    this.handleCloseDialog = this.handleCloseDialog.bind(this);
    this.handleUnassignHealthcareService = this.handleUnassignHealthcareService.bind(this);
  }

  componentDidMount() {
    this.props.initializeAssignHealthCareServiceToLocationPage();
    this.props.getHealthcareServicesLocationAssignment(this.props.organization.id, this.props.organization.name, this.props.match.params.id, 1);
  }

  onCheckAssignedCheckbox(evt, checked, healthcareServiceLogicalId) {
    const locationLogicalId = this.props.match.params.id;
    if (checked) {
      this.props.updateHealthcareServicesLocationAssignment(this.props.organization.id, locationLogicalId, healthcareServiceLogicalId);
    } else {
      const selectedLocation = find(this.props.location, { logicalId: locationLogicalId });
      const selectedHealthcareService = find(this.props.healthcareServices, { logicalId: healthcareServiceLogicalId });
      this.setState({ selectedHealthCareServiceName: selectedHealthcareService.name });
      this.setState({ healthcareServiceLogicalId });
      this.setState({ selectedLocationName: selectedLocation.name });
      this.setState({ open: true });
    }
  }

  handleCloseDialog() {
    this.props.markHealthcareServiceAsAssigned(this.state.healthcareServiceLogicalId);
    this.setState({ open: false });
  }

  handlePageClick(currentPage) {
    this.props.getHealthcareServicesLocationAssignment(this.props.organization.id, this.props.organization.name, this.props.match.params.id, currentPage);
  }

  handleUnassignHealthcareService() {
    const locationLogicalId = this.props.match.params.id;
    this.props.unassignHealthcareServicesLocationAssignment(this.props.organization.id, locationLogicalId, this.state.healthcareServiceLogicalId);
    this.setState({ open: false });
  }

  render() {
    const logicalId = this.props.match.params.id;
    const selectedLocation = find(this.props.location, { logicalId });
    const { loading, healthcareServices, organization } = this.props;
    const actions = [
      <StyledFlatButton
        label={<FormattedMessage {...messages.dialogButtonLabelCancel} />}
        primary
        onClick={this.handleCloseDialog}
      />,
      <StyledFlatButton
        label={<FormattedMessage {...messages.dialogButtonLabelSubmit} />}
        primary
        keyboardFocused
        onClick={this.handleUnassignHealthcareService}
      />,
    ];
    return (
      <div className={styles.root}>
        <Helmet>
          <title>Assign Healthcare Service To the Location</title>
          <meta name="description" content="Assign the selected Healthcare Service to the Location" />
        </Helmet>
        <div className={styles.header}>
          <FormattedMessage {...messages.header} />
        </div>
        <Divider />

        <div>
          {isEmpty(organization) &&
          <h4><FormattedMessage {...messages.organizationNotSelected} /></h4>}
          {organization && selectedLocation && <div>
            <div className={styles.organizationInfoSection}>
              <div className={styles.organizationInfoLabel}>
                Organization&nbsp;:&nbsp;
              </div>
              {organization.name}
            </div>
            <div className={styles.locationInfoSection}>
              <div className={styles.locationInfoLabel}>
                Location&nbsp;:&nbsp;
              </div>
              {selectedLocation.name}
            </div>
          </div>
          }

          {loading &&
          <RefreshIndicatorLoading />}

          {!loading && !isEmpty(organization) && isEmpty(healthcareServices) &&
          <div className={styles.noHealthcareServices}>
            <FormattedMessage {...messages.noHealthcareServicesFound} />
          </div>
          }

          {!loading && !isEmpty(organization) && !isEmpty(healthcareServices) && healthcareServices.length > 0 &&
          <div className={styles.textCenter}>
            <HealthcareServiceTable elements={healthcareServices} showAssigned onCheck={this.onCheckAssignedCheckbox} />
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
        <Dialog
          title="Unassign Healthcare Service"
          actions={actions}
          modal
          open={this.state.open}
          onRequestClose={this.handleCloseDialog}
        >
          <FormattedMessage
            {...messages.confirmLocationUnassignment}
            values={{
              selectedHealthCareServiceName: <strong>{this.state.selectedHealthCareServiceName} </strong>,
              selectedLocationName: <strong>{this.state.selectedLocationName} </strong>,
            }}
          />
        </Dialog>
      </div>
    );
  }
}

AssignHealthCareServiceToLocationPage.propTypes = {
  match: PropTypes.object,
  getHealthcareServicesLocationAssignment: PropTypes.func,
  initializeAssignHealthCareServiceToLocationPage: PropTypes.func,
  updateHealthcareServicesLocationAssignment: PropTypes.func,
  markHealthcareServiceAsAssigned: PropTypes.func,
  unassignHealthcareServicesLocationAssignment: PropTypes.func,
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
    getHealthcareServicesLocationAssignment: (organizationId, organizationName, locationId, currentPage) => dispatch(getHealthcareServicesLocationAssignment(organizationId, organizationName, locationId, currentPage)),
    updateHealthcareServicesLocationAssignment: (organizationId, locationId, healthcareServiceId) => dispatch(updateHealthcareServicesLocationAssignment(organizationId, locationId, healthcareServiceId)),
    unassignHealthcareServicesLocationAssignment: (organizationId, locationId, healthcareServiceId) => dispatch(unassignHealthcareServicesLocationAssignment(organizationId, locationId, healthcareServiceId)),
    markHealthcareServiceAsAssigned: (healthcareServiceId) => dispatch(markHealthcareServiceAsAssigned(healthcareServiceId)),
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
