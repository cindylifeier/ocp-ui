/**
 *
 * AddAppointmentParticipant
 *
 */

import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { createStructuredSelector } from 'reselect';
import { compose } from 'redux';
import isEmpty from 'lodash/isEmpty';

import injectSaga from 'utils/injectSaga';
import injectReducer from 'utils/injectReducer';
import { getLookupsAction } from 'containers/App/actions';
import { APPOINTMENT_PARTICIPANT_REQUIRED, DEFAULT_START_PAGE_NUMBER } from 'containers/App/constants';
import { makeSelectOrganization } from 'containers/App/contextSelectors';
import { makeSelectAppointmentParticipationRequired } from 'containers/App/lookupSelectors';
import { getLogicalIdFromReference } from 'containers/App/helpers';
import AddAppointmentParticipantModal from 'components/AddAppointmentParticipantModal';
import {
  getHealthcareServiceReferences,
  getLocationReferences,
  getPractitionerReferences,
  searchParticipantReferences,
} from './actions';
import {
  makeSelectHealthcareServiceReferences,
  makeSelectLocationReferences,
  makeSelectPractitionerReferences,
  makeSelectSearchPraticipantReferences,
} from './selectors';
import reducer from './reducer';
import saga from './saga';
import { ORGANIZATION_RESOURCE_TYPE } from './constants';

export class AddAppointmentParticipant extends React.Component { // eslint-disable-line react/prefer-stateless-function
  constructor(props) {
    super(props);
    this.handleGetAvailableLocations = this.handleGetAvailableLocations.bind(this);
    this.handleGetAvailableHealthcareServices = this.handleGetAvailableHealthcareServices.bind(this);
    this.handleGetAvailablePractitioners = this.handleGetAvailablePractitioners.bind(this);
    this.handleSearchParticipantReferences = this.handleSearchParticipantReferences.bind(this);
  }

  componentDidMount() {
    const { organization } = this.props;
    this.props.getLookups();
    if (organization) {
      const resourceType = ORGANIZATION_RESOURCE_TYPE;
      const resourceValue = organization.logicalId;
      this.props.getPractitionerReferences(resourceType, resourceValue);
      this.props.getLocationReferences(resourceType, resourceValue);
      this.props.getHealthcareServiceReferences(resourceType, resourceValue);
    }
  }

  handleGetAvailableLocations(resourceType, resourceReferenceValue) {
    const resourceValue = getLogicalIdFromReference(resourceReferenceValue);
    if (resourceValue) {
      this.props.getLocationReferences(resourceType, resourceValue);
    }
  }

  handleGetAvailableHealthcareServices(resourceType, resourceReferenceValue) {
    const resourceValue = getLogicalIdFromReference(resourceReferenceValue);
    if (resourceValue) {
      this.props.getHealthcareServiceReferences(resourceType, resourceValue);
    }
  }

  handleGetAvailablePractitioners(resourceType, resourceReferenceValue) {
    const resourceValue = getLogicalIdFromReference(resourceReferenceValue);
    if (resourceValue) {
      this.props.getPractitionerReferences(resourceType, resourceValue);
    }
  }

  handleSearchParticipantReferences(searchType, searchValue) {
    const { organization } = this.props;
    const organizationId = organization.logicalId;
    this.props.searchParticipantReferences(searchType, searchValue, organizationId, DEFAULT_START_PAGE_NUMBER);
  }

  render() {
    const {
      formErrors,
      participants,
      healthcareServices,
      locations,
      practitioners,
      participantReferences,
      appointmentParticipantAttendance,
    } = this.props;

    return (
      (!isEmpty(healthcareServices) || !isEmpty(practitioners) || !isEmpty(locations)) &&
      <AddAppointmentParticipantModal
        errors={formErrors}
        participants={participants}
        healthcareServices={healthcareServices}
        locations={locations}
        practitioners={practitioners}
        participantReferences={participantReferences}
        participantAttendance={appointmentParticipantAttendance}
        onGetAvailableLocations={this.handleGetAvailableLocations}
        onGetAvailableHealthcareServices={this.handleGetAvailableHealthcareServices}
        onGetAvailablePractitioners={this.handleGetAvailablePractitioners}
        onSearchParticipantReferences={this.handleSearchParticipantReferences}
      />
    );
  }
}

AddAppointmentParticipant.propTypes = {
  getLookups: PropTypes.func.isRequired,
  healthcareServices: PropTypes.array,
  locations: PropTypes.array,
  appointmentParticipantAttendance: PropTypes.array,
  practitioners: PropTypes.array,
  participantReferences: PropTypes.shape({
    loading: PropTypes.bool,
    currentPage: PropTypes.number,
    totalNumberOfPages: PropTypes.number,
    data: PropTypes.array,
  }),
  getHealthcareServiceReferences: PropTypes.func.isRequired,
  getPractitionerReferences: PropTypes.func.isRequired,
  getLocationReferences: PropTypes.func.isRequired,
  searchParticipantReferences: PropTypes.func.isRequired,
  organization: PropTypes.object.isRequired,
  formErrors: PropTypes.object,
  participants: PropTypes.arrayOf(PropTypes.shape({
    display: PropTypes.string,
    participantRequiredCode: PropTypes.string,
    participantStatusCode: PropTypes.string,
    participationTypeCode: PropTypes.string,
    reference: PropTypes.string,
  })),
};

const mapStateToProps = createStructuredSelector({
  organization: makeSelectOrganization(),
  healthcareServices: makeSelectHealthcareServiceReferences(),
  locations: makeSelectLocationReferences(),
  practitioners: makeSelectPractitionerReferences(),
  participantReferences: makeSelectSearchPraticipantReferences(),
  appointmentParticipantAttendance: makeSelectAppointmentParticipationRequired(),
});

function mapDispatchToProps(dispatch) {
  return {
    getLookups: () => dispatch(getLookupsAction([APPOINTMENT_PARTICIPANT_REQUIRED])),
    getHealthcareServiceReferences: (resourceType, resourceValue) => dispatch(getHealthcareServiceReferences(resourceType, resourceValue)),
    getLocationReferences: (resourceType, resourceValue) => dispatch(getLocationReferences(resourceType, resourceValue)),
    getPractitionerReferences: (resourceType, resourceValue) => dispatch(getPractitionerReferences(resourceType, resourceValue)),
    searchParticipantReferences: (searchType, searchValue, organizationId, currentPage) => dispatch(searchParticipantReferences(searchType, searchValue, organizationId, currentPage)),
  };
}


const withConnect = connect(mapStateToProps, mapDispatchToProps);

const withReducer = injectReducer({ key: 'addAppointmentParticipant', reducer });
const withSaga = injectSaga({ key: 'addAppointmentParticipant', saga });

export default compose(
  withReducer,
  withSaga,
  withConnect,
)(AddAppointmentParticipant);
