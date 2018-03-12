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
import { makeSelectAppointmentStatuses, makeSelectAppointmentTypes } from 'containers/App/lookupSelectors';
import makeSelectSelectedPatient from 'containers/App/sharedDataSelectors';
import { initializeManageAppointment, saveAppointment } from 'containers/ManageAppointmentPage/actions';
import SearchAppointmentParticipant from 'containers/SearchAppointmentParticipant';
import {
  initializeSearchAppointmentParticipantResult,
  removeAppointmentParticipant,
} from 'containers/SearchAppointmentParticipant/actions';
import { makeSelectSelectedParticipants } from 'containers/SearchAppointmentParticipant/selectors';
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
import messages from './messages';
import reducer from './reducer';
import saga from './saga';

export class ManageAppointmentPage extends React.PureComponent { // eslint-disable-line react/prefer-stateless-function

  constructor(props) {
    super(props);
    this.state = {
      open: false,
      name: '',
      member: '',
    };
    this.handleSave = this.handleSave.bind(this);
    this.handleClose = this.handleClose.bind(this);
    this.handleOpen = this.handleOpen.bind(this);
    this.handleRemoveParticipant = this.handleRemoveParticipant.bind(this);
  }

  componentWillMount() {
    this.props.getLookups();
  }

  componentWillUnmount() {
    this.props.initializeManageAppointment();
  }

  handleSave(appointmentFormData, actions) {
    const patientId = this.props.selectedPatient.id;
    if (patientId) {
      merge(appointmentFormData, { patientId });
    }
    const patientName = mapToPatientName(this.props.selectedPatient);
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

  handleClose() {
    this.setState({ open: false });
  }

  handleOpen() {
    this.setState({ open: true });
    this.props.initializeSearchParticipantResult();
  }

  handleRemoveParticipant(participant) {
    this.props.removeParticipant(participant);
  }

  render() {
    const {
      match,
      selectedPatient,
      appointmentStatuses,
      appointmentTypes,
      selectedParticipants,
    } = this.props;
    const editMode = !isUndefined(match.params.id);
    const appointment = null;
    const initialSelectedParticipants = [];
    const manageAppointmentProps = {
      selectedPatient,
      appointment,
      editMode,
      appointmentStatuses,
      appointmentTypes,
      selectedParticipants,
      initialSelectedParticipants,
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
        {((editMode && appointment) || !editMode) &&
        <SearchAppointmentParticipant
          initialSelectedParticipants={initialSelectedParticipants}
          isOpen={this.state.open}
          handleOpen={this.handleOpen}
          handleClose={this.handleClose}
        >
        </SearchAppointmentParticipant>
        }
      </Page>
    );
  }
}

ManageAppointmentPage.propTypes = {
  match: PropTypes.object,
  getLookups: PropTypes.func.isRequired,
  saveAppointment: PropTypes.func.isRequired,
  selectedParticipants: PropTypes.array,
  selectedPatient: PropTypes.object,
  initializeManageAppointment: PropTypes.func.isRequired,
  initializeSearchParticipantResult: PropTypes.func.isRequired,
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
};

const mapStateToProps = createStructuredSelector({
  appointmentStatuses: makeSelectAppointmentStatuses(),
  appointmentTypes: makeSelectAppointmentTypes(),
  selectedPatient: makeSelectSelectedPatient(),
  selectedParticipants: makeSelectSelectedParticipants(),
});

function mapDispatchToProps(dispatch) {
  return {
    initializeManageAppointment: () => dispatch(initializeManageAppointment()),
    getLookups: () => dispatch(getLookupsAction([APPOINTMENT_STATUS, APPOINTMENT_TYPE])),
    saveAppointment: (appointmentFormData, handleSubmitting) => dispatch(saveAppointment(appointmentFormData, handleSubmitting)),
    removeParticipant: (participant) => dispatch(removeAppointmentParticipant(participant)),
    initializeSearchParticipantResult: () => dispatch(initializeSearchAppointmentParticipantResult()),
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