/**
 *
 * ManageAppointmentPage
 *
 */

import ManageAppointment from 'components/ManageAppointment';
import Page from 'components/Page';
import PageHeader from 'components/PageHeader';
import { getLookupsAction } from 'containers/App/actions';
import { APPOINTMENT_STATUS, APPOINTMENT_TYPE } from 'containers/App/constants';
import {
  makeSelectPatient,
  makeSelectUser,
  makeSelectOrganization,
} from 'containers/App/contextSelectors';
import { makeSelectAppointmentStatuses, makeSelectAppointmentTypes } from 'containers/App/lookupSelectors';
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

import injectSaga from 'utils/injectSaga';
import { mapToPatientName } from 'utils/PatientUtils';
import {
  getAppointment,
  saveAppointment,
  initializeManageAppointment,
  getHealthcareService,
} from './actions';
import { mapToEditParticipants } from './api';
import messages from './messages';
import reducer from './reducer';
import saga from './saga';
import {
  makeSelectAppointment,
  makeSelectHealthcareService,
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
  }

  componentDidMount() {
    this.props.getLookups();
    const appointmentId = this.props.match.params.id;
    const { organization } = this.props;
    if (appointmentId) {
      this.props.getAppointment(appointmentId);
    }
    if (organization) {
      this.props.getHealthcareService(organization.logicalId);
    }
  }

  componentWillUnmount() {
    this.props.initializeManageAppointment();
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

  render() {
    const {
      match,
      patient,
      appointmentStatuses,
      appointmentTypes,
      selectedParticipants,
      selectedAppointment,
      healthcareServices,
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
      appointment,
      editMode,
      appointmentStatuses,
      appointmentTypes,
      selectedParticipants,
      initialSelectedParticipants,
      healthcareServices,
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
  getHealthcareService: PropTypes.func.isRequired,
  selectedAppointment: PropTypes.object,
  organization: PropTypes.object,
};

const mapStateToProps = createStructuredSelector({
  appointmentStatuses: makeSelectAppointmentStatuses(),
  appointmentTypes: makeSelectAppointmentTypes(),
  patient: makeSelectPatient(),
  user: makeSelectUser(),
  selectedParticipants: makeSelectSelectedAppointmentParticipants(),
  selectedAppointment: makeSelectAppointment(),
  organization: makeSelectOrganization(),
  healthcareServices: makeSelectHealthcareService(),
});

function mapDispatchToProps(dispatch) {
  return {
    initializeManageAppointment: () => dispatch(initializeManageAppointment()),
    getLookups: () => dispatch(getLookupsAction([APPOINTMENT_STATUS, APPOINTMENT_TYPE])),
    saveAppointment: (appointmentFormData, handleSubmitting) => dispatch(saveAppointment(appointmentFormData, handleSubmitting)),
    removeParticipant: (participant) => dispatch(removeAppointmentParticipant(participant)),
    getAppointment: (appointmentId) => dispatch(getAppointment(appointmentId)),
    getHealthcareService: (organizationId) => dispatch(getHealthcareService(organizationId)),
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
