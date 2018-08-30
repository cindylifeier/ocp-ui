/**
 *
 * SearchAppointmentParticipant
 *
 */
import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { compose } from 'redux';
import { createStructuredSelector } from 'reselect';
import isEmpty from 'lodash/isEmpty';
import find from 'lodash/find';

import injectSaga from 'utils/injectSaga';
import injectReducer from 'utils/injectReducer';
import { getLookupsAction } from 'containers/App/actions';
import {
  APPOINTMENT_PARTICIPANT_REQUIRED,
  APPOINTMENT_PARTICIPANT_TYPE,
  APPOINTMENT_PARTICIPATION_STATUS,
  APPOINTMENT_PARTICIPATION_TYPE,
} from 'containers/App/constants';
import { makeSelectAppointmentParticipationRequired } from 'containers/App/lookupSelectors';
import { makeSelectOrganization, makeSelectPatient } from 'containers/App/contextSelectors';
import { getLogicalIdFromReference } from 'containers/App/helpers';
import AddAppointmentParticipantModal from 'components/AddAppointmentParticipantModal';
import {
  addAppointmentParticipants,
  getCareTeamReferences,
  getHealthcareServiceReferences,
  getLocationReferences,
  getPractitionerReferences,
} from './actions';
import {
  makeSelectCareTeamReferences,
  makeSelectHealthcareServiceReferences,
  makeSelectLocationReferences,
  makeSelectPractitionerReferences,
} from './selectors';
import reducer from './reducer';
import saga from './saga';


export class SearchAppointmentParticipant extends React.Component { // eslint-disable-line react/prefer-stateless-function
  constructor(props) {
    super(props);
    this.state = {
      open: false,
      initializeParticipant: false,
    };
    this.handleAddParticipant = this.handleAddParticipant.bind(this);
    this.handleDialogClose = this.handleDialogClose.bind(this);
    this.handleSelectLocation = this.handleSelectLocation.bind(this);
    this.handleSelectPractitioner = this.handleSelectPractitioner.bind(this);
  }

  componentDidMount() {
    const { organization, patient } = this.props;

    this.props.getLookups();
    if (organization) {
      this.props.getHealthcareServiceReferences(organization.logicalId);
    }

    if (patient) {
      this.props.getCareTeamReferences(patient.id);
    }
  }

  findObject(entries, selectedParticipant, key, value) {
    const searckObject = {};
    searckObject[key] = selectedParticipant[value];
    return selectedParticipant && selectedParticipant[value] && find(entries, searckObject);
  }

  handleAddParticipant(selectedParticipant) {
    const { healthcareServices, locations, appointmentParticipantRequired, practitioners, careTeams } = this.props;

    const participantList = [];

    const service = this.findObject(healthcareServices, selectedParticipant, 'reference', 'service');
    if (!isEmpty(service)) {
      participantList.push(service);
    }

    const location = this.findObject(locations, selectedParticipant, 'reference', 'location');
    if (!isEmpty(location)) {
      participantList.push(location);
    }
    const practitioner = this.findObject(practitioners, selectedParticipant, 'reference', 'practitioner');
    if (!isEmpty(practitioner)) {
      participantList.push(practitioner);
    }

    const careTeam = this.findObject(careTeams, selectedParticipant, 'reference', 'careTeam');
    if (!isEmpty(careTeam)) {
      participantList.push(careTeam);
    }

    const required = this.findObject(appointmentParticipantRequired, selectedParticipant, 'code', 'required');

    if (practitioner && required) {
      practitioner.participantRequiredDisplay = required.display;
      practitioner.participantRequiredSystem = required.system;
    }

    if (participantList.length > 0) {
      this.props.addParticipants(participantList);
    }
  }

  handleDialogClose() {
    this.setState({ open: false });
    this.props.handleClose();
  }

  handleSelectLocation(healtcareServiceRefrence) {
    const healthcareServiceId = getLogicalIdFromReference(healtcareServiceRefrence);
    if (healthcareServiceId) {
      this.props.getLocationReferences(healthcareServiceId);
    }
  }

  handleSelectPractitioner(locationReference) {
    const locationId = getLogicalIdFromReference(locationReference);
    if (locationId) {
      this.props.getPractitionerReferences(this.props.organization.logicalId, locationId);
    }
  }

  render() {
    const {
      healthcareServices,
      locations,
      practitioners,
      appointmentParticipantRequired,
    } = this.props;

    return (
      <AddAppointmentParticipantModal
        healthcareServices={healthcareServices}
        locations={locations}
        practitioners={practitioners}
        participantAttendance={appointmentParticipantRequired}
      />
    );
  }
}


SearchAppointmentParticipant.propTypes = {
  addParticipants: PropTypes.func.isRequired,
  getLookups: PropTypes.func.isRequired,
  handleClose: PropTypes.func,
  patient: PropTypes.object,
  healthcareServices: PropTypes.array,
  locations: PropTypes.array,
  appointmentParticipantRequired: PropTypes.array,
  practitioners: PropTypes.array,
  careTeams: PropTypes.array,
  getHealthcareServiceReferences: PropTypes.func.isRequired,
  getPractitionerReferences: PropTypes.func.isRequired,
  getCareTeamReferences: PropTypes.func.isRequired,
  getLocationReferences: PropTypes.func.isRequired,
  organization: PropTypes.object.isRequired,
};

const mapStateToProps = createStructuredSelector({
  patient: makeSelectPatient(),
  organization: makeSelectOrganization(),
  healthcareServices: makeSelectHealthcareServiceReferences(),
  locations: makeSelectLocationReferences(),
  practitioners: makeSelectPractitionerReferences(),
  appointmentParticipantRequired: makeSelectAppointmentParticipationRequired(),
  careTeams: makeSelectCareTeamReferences(),
});

function mapDispatchToProps(dispatch) {
  return {
    getLookups: () => dispatch(getLookupsAction([APPOINTMENT_PARTICIPANT_TYPE, APPOINTMENT_PARTICIPATION_STATUS, APPOINTMENT_PARTICIPATION_TYPE, APPOINTMENT_PARTICIPANT_REQUIRED])),
    addParticipants: (participant) => dispatch(addAppointmentParticipants(participant)),
    getHealthcareServiceReferences: (organizationId) => dispatch(getHealthcareServiceReferences(organizationId)),
    getCareTeamReferences: (patientId) => dispatch(getCareTeamReferences(patientId)),
    getLocationReferences: (healthcareServiceId) => dispatch(getLocationReferences(healthcareServiceId)),
    getPractitionerReferences: (organizationId, locationId) => dispatch(getPractitionerReferences(organizationId, locationId)),
  };
}

const withConnect = connect(mapStateToProps, mapDispatchToProps);

const withReducer = injectReducer({ key: 'searchAppointmentParticipant', reducer });
const withSaga = injectSaga({ key: 'searchAppointmentParticipant', saga });

export default compose(
  withReducer,
  withSaga,
  withConnect,
)(SearchAppointmentParticipant);
