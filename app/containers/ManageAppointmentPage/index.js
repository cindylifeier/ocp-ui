/**
 *
 * ManageAppointmentPage
 *
 */

import ManageAppointment from 'components/ManageAppointment';
import Page from 'components/Page';
import PageHeader from 'components/PageHeader';
import { getLookupsAction } from 'containers/App/actions';
import find from 'lodash/find';
import {
  APPOINTMENT_STATUS,
  APPOINTMENT_TYPE,
  APPOINTMENT_PARTICIPANT_REQUIRED,
} from 'containers/App/constants';
import {
  makeSelectPatient,
  makeSelectUser,
  makeSelectOrganization,
} from 'containers/App/contextSelectors';
import {
  makeSelectAppointmentStatuses,
  makeSelectAppointmentTypes,
  makeSelectAppointmentParticipationRequired,
} from 'containers/App/lookupSelectors';
import {
  removeAppointmentParticipant,
} from 'containers/SearchAppointmentParticipant/actions';
import { makeSelectSelectedAppointmentParticipants } from 'containers/SearchAppointmentParticipant/selectors';
import isUndefined from 'lodash/isUndefined';
import merge from 'lodash/merge';
import PropTypes from 'prop-types';
import React from 'react';
import { Helmet } from 'react-helmet';
import { FormattedMessage } from 'react-intl';
import { connect } from 'react-redux';
import { compose } from 'redux';
import { createStructuredSelector } from 'reselect';
import injectReducer from 'utils/injectReducer';
import { getLogicalIdFromReference } from 'containers/App/helpers';
import injectSaga from 'utils/injectSaga';
import { mapToPatientName } from 'utils/PatientUtils';
import {
  getAppointment,
  saveAppointment,
  initializeManageAppointment,
  getHealthcareServiceReferences,
  getLocationReferences,
  getPractitionerReferences,
  getCareTeamReferences,
  getAddParticipants,
} from './actions';
import { mapToEditParticipants } from './api';
import messages from './messages';
import reducer from './reducer';
import saga from './saga';
import {
  makeSelectAppointment,
  makeSelectLocationReferences,
  makeSelectPractitionerReferences,
  makeSelectHealthcareServiceReferences,
  makeSelectCareTeamReferences,
} from './selectors';

export class ManageAppointmentPage extends React.Component { // eslint-disable-line react/prefer-stateless-function

  constructor(props) {
    super(props);
    this.state = {
      name: '',
      member: '',
    };
    this.handleSave = this.handleSave.bind(this);
    this.handleRemoveParticipant = this.handleRemoveParticipant.bind(this);
    this.handleSelectLocation = this.handleSelectLocation.bind(this);
    this.handleSelectPractitioner = this.handleSelectPractitioner.bind(this);
    this.handleAddParticipant = this.handleAddParticipant.bind(this);
  }

  componentDidMount() {
    this.props.getLookups();
    const appointmentId = this.props.match.params.id;
    const { organization, patient } = this.props;
    if (appointmentId) {
      this.props.getAppointment(appointmentId);
    }
    if (organization) {
      this.props.getHealthcareServiceReferences(organization.logicalId);
    }

    if (patient) {
      this.props.getCareTeamReferences(patient.id);
    }
  }

  componentWillUnmount() {
    this.props.initializeManageAppointment();
  }

  handleAddParticipant(selectedParticipant) {
    const { healthcareServices, locations, appointmentParticipantRequired, practitioners, careTeams } = this.props;

    const service = this.findObject(healthcareServices, selectedParticipant, 'reference', 'service');
    const location = this.findObject(locations, selectedParticipant, 'reference', 'location');
    const practitioner = this.findObject(practitioners, selectedParticipant, 'reference', 'practitioner');
    const required = this.findObject(appointmentParticipantRequired, selectedParticipant, 'code', 'required');
    const careTeam = this.findObject(careTeams, selectedParticipant, 'reference', 'careTeam');

    const participantList = [service, location, practitioner, required, careTeam];
    this.props.addParticipants(participantList);
  }

  findObject(entries, selectedParticipant, key, value) {
    const searckObject = {};
    searckObject[key] = selectedParticipant[value];
    return selectedParticipant && selectedParticipant[value] && find(entries, searckObject);
  }
  handleSave(appointmentFormData, actions) {
    const patientId = this.props.patient.id;
    const practitionerId = (this.props.user && this.props.user.fhirResource) ? this.props.user.fhirResource.logicalId : null;
    if (practitionerId) {
      merge(appointmentFormData, { practitionerId });
    }
    const practitionerName = mapToPatientName(this.props.user.fhirResource);
    if (practitionerName) {
      merge(appointmentFormData, { practitionerName });
    }
    if (patientId) {
      merge(appointmentFormData, { patientId });
    }
    const patientName = mapToPatientName(this.props.patient);
    if (patientName) {
      merge(appointmentFormData, { patientName });
    }
    const appointmentId = this.props.match.params.id;
    if (appointmentId) {
      merge(appointmentFormData, { appointmentId });
    }
    // Add selected participants to form data
    const selectedParticipants = this.props.selectedParticipants;
    merge(appointmentFormData, { participants: selectedParticipants });
    this.props.saveAppointment(appointmentFormData, () => actions.setSubmitting(false));
  }

  handleRemoveParticipant(participant) {
    this.props.removeParticipant(participant);
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
      match,
      patient,
      appointmentStatuses,
      appointmentTypes,
      selectedParticipants,
      selectedAppointment,
      healthcareServices,
      locations,
      practitioners,
      appointmentParticipantRequired,
      careTeams,
    } = this.props;
    const editMode = !isUndefined(match.params.id);
    let appointment = null;
    let initialSelectedParticipants = [];
    if (editMode && selectedAppointment) {
      appointment = selectedAppointment;
      initialSelectedParticipants = mapToEditParticipants(appointment.participant);
    }

    const manageAppointmentProps = {
      patient,
      careTeams,
      appointment,
      editMode,
      appointmentStatuses,
      appointmentTypes,
      selectedParticipants,
      initialSelectedParticipants,
      handleAddParticipant: this.handleAddParticipant,
      healthcareServices,
      locations,
      practitioners,
      appointmentParticipantRequired,
      handleSelectLocation: this.handleSelectLocation,
      handleSelectPractitioner: this.handleSelectPractitioner,
    };

    return (
      <Page>
        <Helmet>
          <title>Manage Appointment</title>
          <meta name="description" content="Manage Appointment" />
        </Helmet>
        <PageHeader
          title={editMode ?
            <FormattedMessage {...messages.updateTitle} />
            : <FormattedMessage {...messages.createTitle} />}
          subtitle={<FormattedMessage {...messages.generalInfoTitle} />}
        />
        <ManageAppointment
          {...manageAppointmentProps}
          onSave={this.handleSave}
          removeParticipant={this.handleRemoveParticipant}
          handleOpen={this.handleOpen}
        />
      </Page>
    );
  }
}

ManageAppointmentPage.propTypes = {
  match: PropTypes.object,
  getLookups: PropTypes.func.isRequired,
  saveAppointment: PropTypes.func.isRequired,
  selectedParticipants: PropTypes.array,
  healthcareServices: PropTypes.array,
  locations: PropTypes.array,
  practitioners: PropTypes.array,
  patient: PropTypes.object,
  user: PropTypes.object,
  initializeManageAppointment: PropTypes.func.isRequired,
  removeParticipant: PropTypes.func.isRequired,
  appointmentStatuses: PropTypes.arrayOf(PropTypes.shape({
    code: PropTypes.string.isRequired,
    system: PropTypes.string.isRequired,
    display: PropTypes.string.isRequired,
  })),
  appointmentTypes: PropTypes.arrayOf(PropTypes.shape({
    code: PropTypes.string.isRequired,
    system: PropTypes.string.isRequired,
    display: PropTypes.string.isRequired,
  })),
  getAppointment: PropTypes.func.isRequired,
  getHealthcareServiceReferences: PropTypes.func.isRequired,
  getPractitionerReferences: PropTypes.func.isRequired,
  getCareTeamReferences: PropTypes.func.isRequired,
  getLocationReferences: PropTypes.func.isRequired,
  addParticipants: PropTypes.func.isRequired,
  selectedAppointment: PropTypes.object,
  organization: PropTypes.object,
  appointmentParticipantRequired: PropTypes.array,
  careTeams: PropTypes.array,
};

const mapStateToProps = createStructuredSelector({
  appointmentStatuses: makeSelectAppointmentStatuses(),
  appointmentTypes: makeSelectAppointmentTypes(),
  patient: makeSelectPatient(),
  user: makeSelectUser(),
  selectedParticipants: makeSelectSelectedAppointmentParticipants(),
  selectedAppointment: makeSelectAppointment(),
  organization: makeSelectOrganization(),
  healthcareServices: makeSelectHealthcareServiceReferences(),
  locations: makeSelectLocationReferences(),
  practitioners: makeSelectPractitionerReferences(),
  appointmentParticipantRequired: makeSelectAppointmentParticipationRequired(),
  careTeams: makeSelectCareTeamReferences(),
});

function mapDispatchToProps(dispatch) {
  return {
    initializeManageAppointment: () => dispatch(initializeManageAppointment()),
    getLookups: () => dispatch(getLookupsAction([APPOINTMENT_STATUS, APPOINTMENT_TYPE, APPOINTMENT_PARTICIPANT_REQUIRED])),
    saveAppointment: (appointmentFormData, handleSubmitting) => dispatch(saveAppointment(appointmentFormData, handleSubmitting)),
    removeParticipant: (participant) => dispatch(removeAppointmentParticipant(participant)),
    getAppointment: (appointmentId) => dispatch(getAppointment(appointmentId)),
    getHealthcareServiceReferences: (organizationId) => dispatch(getHealthcareServiceReferences(organizationId)),
    getCareTeamReferences: (patientId) => dispatch(getCareTeamReferences(patientId)),
    getLocationReferences: (healthcareServiceId) => dispatch(getLocationReferences(healthcareServiceId)),
    getPractitionerReferences: (organizationId, locationId) => dispatch(getPractitionerReferences(organizationId, locationId)),
    addParticipants: (participants) => dispatch(getAddParticipants(participants)),
  };
}

const withConnect = connect(mapStateToProps, mapDispatchToProps);

const withReducer = injectReducer({ key: 'manageAppointmentPage', reducer });
const withSaga = injectSaga({ key: 'manageAppointmentPage', saga });

export default compose(
  withReducer,
  withSaga,
  withConnect,
)(ManageAppointmentPage);
