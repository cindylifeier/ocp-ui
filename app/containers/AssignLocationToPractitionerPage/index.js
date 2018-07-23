/**
 *
 * AssignLocationToPractitionerPage
 *
 */

import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { Helmet } from 'react-helmet';
import { FormattedMessage } from 'react-intl';
import { createStructuredSelector } from 'reselect';
import { compose } from 'redux';
import isEmpty from 'lodash/isEmpty';
import uniqueId from 'lodash/uniqueId';
import Dialog from 'material-ui/Dialog';
import Page from 'components/Page';
import PageHeader from 'components/PageHeader';
import PageContent from 'components/PageContent';
import H3 from 'components/H3';
import injectSaga from 'utils/injectSaga';
import injectReducer from 'utils/injectReducer';
import {
  getPractitionerLocationAssignment,
  initializeAssignLocationToPractitionerPage,
} from 'containers/AssignLocationToPractitionerPage/actions';
import { makeSelectOrganization, makeSelectPractitioner } from 'containers/App/contextSelectors';
import InfoSection from 'components/InfoSection';
import InlineLabel from 'components/InlineLabel';
import RefreshIndicatorLoading from 'components/RefreshIndicatorLoading';
import CenterAlign from 'components/Align/CenterAlign';
import CenterAlignedUltimatePagination from 'components/CenterAlignedUltimatePagination';
import StyledFlatButton from 'components/StyledFlatButton';
import NoResultsFoundText from 'components/NoResultsFoundText';
import AssignLocationTable from 'components/AssignLocationTable';
import { DEFAULT_START_PAGE_NUMBER } from 'containers/App/constants';
// import find from 'lodash/find';
import reducer from './reducer';
import saga from './saga';
import messages from './messages';

export class AssignLocationToPractitionerPage extends React.Component { // eslint-disable-line react/prefer-stateless-function

  constructor(props) {
    super(props);
    this.state = {
      currentPage: 1,
      open: false,
      selectedLocationName: '',
      selectedPractitionerName: '',
      locationLogicalId: '',
    };
    this.ORGANIZATION_NAME_HTML_ID = uniqueId('organization_name_');
    this.PRACTITIONER_NAME_HTML_ID = uniqueId('practitioner_name_');
    this.handlePageClick = this.handlePageClick.bind(this);
    this.onCheckAssignedCheckbox = this.onCheckAssignedCheckbox.bind(this);
    this.handleCloseDialog = this.handleCloseDialog.bind(this);
    this.handleUnassignLocation = this.handleUnassignLocation.bind(this);
  }

  componentDidMount() {
    this.props.initializeAssignLocationToPractitionerPage();
    this.props.getPractitionerLocationAssignment(DEFAULT_START_PAGE_NUMBER);
  }

  onCheckAssignedCheckbox() {
  // onCheckAssignedCheckbox(evt, checked, locationLogicalId) {
  //   const practitionerLogicalId = this.props.match.params.id;
    // if (checked) {
    //   this.props.updateHealthcareServicesLocationAssignment(locationLogicalId);
    // } else {
    //   const selectedPractitioner = find(this.props.practitioners, { logicalId: practitionerLogicalId });
    //   const selectedLocation = find(this.props.locations, { logicalId: locationLogicalId });
    //   this.setState({ selectedLocationName: selectedLocation.name });
    //   this.setState({ locationLogicalId });
    //   this.setState({ selectedPractitionerName: selectedPractitioner.name });
    //   this.setState({ open: true });
    // }
  }

  handleCloseDialog() {
    // this.props.markHealthcareServiceAsAssigned(this.state.healthcareServiceLogicalId);
    this.setState({ open: false });
  }

  handlePageClick() {
    // this.props.getHealthcareServicesLocationAssignment(this.props.organization.logicalId, this.props.organization.name, this.props.match.params.id, currentPage);
  }

  handleUnassignLocation() {
    // this.props.unassignHealthcareServicesLocationAssignment(this.state.healthcareServiceLogicalId);
    this.setState({ open: false });
  }

  renderFullName(names) {
    return names && names.map((name) => (<span key={uniqueId()}>{name.firstName} {name.lastName} </span>));
  }

  render() {
    const { currentPage, totalPages, loading, locations, organization, selectedPractitioner } = this.props;
    // const logicalId = this.props.match.params.id;
    const { open, selectedPractitionerName, selectedLocationName } = this.state;
    const actions = [
      <StyledFlatButton onClick={this.handleCloseDialog}>
        <FormattedMessage {...messages.dialogButtonLabelCancel} />
      </StyledFlatButton>,
      <StyledFlatButton keyboardFocused onClick={this.handleUnassignLocation}>
        <FormattedMessage {...messages.dialogButtonLabelSubmit} />
      </StyledFlatButton>,
    ];
    return (
      <Page>
        <Helmet>
          <title>Assign Location to practitioner</title>
          <meta name="description" content="Assign the selected Location to Practitioner" />
        </Helmet>
        <PageHeader title={<FormattedMessage {...messages.header} />} />
        <PageContent>
          {isEmpty(organization) &&
          <h4><FormattedMessage {...messages.organizationNotSelected} /></h4>}
          {organization && selectedPractitioner &&
            <div>
              <InfoSection>
                <InlineLabel htmlFor={this.ORGANIZATION_NAME_HTML_ID}>
                  <FormattedMessage {...messages.labelOrganization} />&nbsp;
                </InlineLabel>
                <span id={this.ORGANIZATION_NAME_HTML_ID}>{organization.name}</span>
              </InfoSection>
              <InfoSection>
                <InlineLabel htmlFor={this.PRACTITIONER_NAME_HTML_ID}>
                  <FormattedMessage {...messages.labelPractitioner} />&nbsp;
                </InlineLabel>
                <span id={this.PRACTITIONER_NAME_HTML_ID}>{this.renderFullName(selectedPractitioner.name)}</span>
              </InfoSection>
            </div>
          }

          {loading &&
          <RefreshIndicatorLoading />}

          {!loading && !isEmpty(organization) && isEmpty(locations) &&
          <NoResultsFoundText>
            <FormattedMessage {...messages.noLocationFound} />
          </NoResultsFoundText>
          }

          {!loading && !isEmpty(organization) && !isEmpty(locations) && locations.length > 0 &&
          <div>
            <CenterAlign>
              <AssignLocationTable />
            </CenterAlign>
            <CenterAlignedUltimatePagination
              currentPage={currentPage}
              totalPages={totalPages}
              onChange={this.handlePageClick}
            />
          </div>
          }
        </PageContent>
        <Dialog
          title={<H3><FormattedMessage {...messages.dialogTitleUnassignLocation} /></H3>}
          actions={actions}
          modal
          open={open}
          onRequestClose={this.handleCloseDialog}
        >
          <FormattedMessage
            {...messages.confirmPractitionerUnassignment}
            values={{
              selectedLocationName: <strong>{selectedLocationName} </strong>,
              selectedPractitionerName: <strong>{selectedPractitionerName} </strong>,
            }}
          />
        </Dialog>
      </Page>
    );
  }
}

AssignLocationToPractitionerPage.propTypes = {
  locations: PropTypes.array,
  loading: PropTypes.bool,
  currentPage: PropTypes.number,
  totalPages: PropTypes.number,
  // match: PropTypes.object,
  organization: PropTypes.object.isRequired,
  selectedPractitioner: PropTypes.object.isRequired,
  getPractitionerLocationAssignment: PropTypes.func.isRequired,
  initializeAssignLocationToPractitionerPage: PropTypes.func.isRequired,

};

const mapStateToProps = createStructuredSelector({
  // assignlocationtopractitionerpage: makeSelectAssignLocationToPractitionerPage(),
  organization: makeSelectOrganization(),
  // locations: makeSelectLocations(),
  selectedPractitioner: makeSelectPractitioner(),
  // loading: makeSelectQueryLoading(),
  // error: makeSelectQueryError(),
  // currentPage: makeSelectCurrentPage(),
  // totalPages: makeSelectTotalNumberOfPages(),
  // healthcareServices: makeSelectHealthcareServices(),
});

function mapDispatchToProps(dispatch) {
  return {
    initializeAssignLocationToPractitionerPage: () => dispatch(initializeAssignLocationToPractitionerPage()),
    getPractitionerLocationAssignment: (currentPage) => dispatch(getPractitionerLocationAssignment(currentPage)),
  };
}

const withConnect = connect(mapStateToProps, mapDispatchToProps);

const withReducer = injectReducer({ key: 'assignLocationToPractitionerPage', reducer });
const withSaga = injectSaga({ key: 'assignLocationToPractitionerPage', saga });

export default compose(
  withReducer,
  withSaga,
  withConnect,
)(AssignLocationToPractitionerPage);
