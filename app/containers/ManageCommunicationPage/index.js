/**
 *
 * ManageCommunicationPage
 *
 */

import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { Helmet } from 'react-helmet';
import { FormattedMessage } from 'react-intl';
import queryString from 'query-string';
import { createStructuredSelector } from 'reselect';
import { compose } from 'redux';
import merge from 'lodash/merge';
import injectSaga from 'utils/injectSaga';
import injectReducer from 'utils/injectReducer';
import find from 'lodash/find';
import {
  makeSelectEpisodeOfCares,
  makeSelectPractitioner,
} from 'containers/ManageCommunicationPage/selectors';
import SearchRecipient from 'containers/SearchRecipient';
import Page from 'components/Page';
import { makeSelectCommunications } from 'containers/Communications/selectors';
import { makeSelectTasks } from 'containers/Tasks/selectors';
import {
  initializeListOfRecipients, initializeSearchRecipients,
  removeSelectedRecipient, setInitialRecipients,
} from 'containers/SearchRecipient/actions';

import { getLookupsAction } from 'containers/App/actions';
import { makeSelectPatient } from 'containers/App/contextSelectors';
import {
  makeSelectCommunicationCategories, makeSelectCommunicationStatus, makeSelectCommunicationMedia,
  makeSelectCommunicationNotDoneReasons,
} from 'containers/App/lookupSelectors';
import {
  COMMUNICATION_CATEGORY, COMMUNICATION_STATUS, COMMUNICATION_MEDIUM,
  COMMUNICATION_NOT_DONE_REASON, DATE_PICKER_MODE, PATIENTS_URL,
} from 'containers/App/constants';
import isUndefined from 'lodash/isUndefined';
import { makeSelectSelectedRecipients } from 'containers/SearchRecipient/selectors';
import { makeSelectUpcomingAppointments } from 'containers/UpcomingAppointments/selectors';
import PageHeader from 'components/PageHeader';
import PageContent from 'components/PageContent';
import ManageCommunication from 'components/ManageCommunication';
import reducer from './reducer';
import saga from './saga';
import messages from './messages';
import { createCommunication, updateCommunication, getEpisodeOfCares,
  getPractitioner } from './actions';

export class ManageCommunicationPage extends React.PureComponent { // eslint-disable-line react/prefer-stateless-function
  constructor(props) {
    super(props);
    this.state = {
      open: false,
      practitionerId: 1377,
      selectedPractitioner: {
        logicalId: '1377',
        name: [{ firstName: 'Deepshikha', lastName: 'A' }],
      },
    };
    this.handleSave = this.handleSave.bind(this);
    this.handleClose = this.handleClose.bind(this);
    this.handleOpen = this.handleOpen.bind(this);
    this.handleRemoveRecipient = this.handleRemoveRecipient.bind(this);
  }
  componentWillMount() {
    this.props.getPractitioner(this.state.practitionerId);
    this.props.getLookups();
    this.props.getEpisodeOfCares(this.props.selectedPatient.id);
    this.props.initializeSearchRecipients();
  }
  componentDidMount() {
    const logicalId = this.props.match.params.id;
    const communication = find(this.props.communications.elements, { logicalId });
    if (communication && communication.recipient) {
      const recipients = communication.recipient;
      this.props.setInitialRecipients(recipients);
    }
  }

  setInitialSelectedRecipients(recipients) {
    this.props.setInitialRecipients(recipients);
  }

  handleOpen() {
    this.props.initializeListOfRecipients();
    this.setState({ open: true });
  }
  handleSave(communication, actions) {
    const logicalId = this.props.match.params.id;
    if (logicalId && communication) {
      const mergedCommunication = merge(communication, { logicalId });
      this.props.updateCommunication(mergedCommunication, this.props.selectedPatient.id, () => actions.setSubmitting(false));
    } else {
      this.props.createCommunication(communication, this.props.selectedPatient.id, () => actions.setSubmitting(false));
    }
  }
  handleRemoveRecipient(checked, recipientReference) {
    this.props.removeSelectedRecipient(checked, recipientReference);
  }
  handleClose() {
    this.setState({ open: false });
  }

  render() {
    const editingCommunication = false;
    const {
      match,
      communications,
      communicationStatus,
      communicationCategories,
      communicationNotDoneReasons,
      communicationMedia,
      episodeOfCares,
      selectedRecipients,
      selectedPatient,
      location,
      tasks,
      appointments,
    } = this.props;
    const logicalId = match.params.id;
    const editMode = !isUndefined(match.params.id);
    let initialSelectedRecipients = [];
    const communication = find(communications.elements, { logicalId });
    if (communication && communication.recipient) {
      initialSelectedRecipients = communication.recipient;
    }
    const practitioner = this.state.selectedPractitioner;
    let selectedTask = null;
    if (location && location.search && tasks && tasks.data && tasks.data.elements) {
      const queryObj = queryString.parse(location.search);
      const taskId = queryObj.taskId;
      selectedTask = find(tasks.data.elements, { logicalId: taskId });
    }

    let selectedAppointment = null;
    if (location && location.search && appointments && appointments.data && appointments.data.elements) {
      const queryObj = queryString.parse(location.search);
      const appointmentId = queryObj.appointmentId;
      selectedAppointment = find(appointments.data.elements, { logicalId: appointmentId });
    }
    const datePickerMode = DATE_PICKER_MODE;
    const patientUrl = PATIENTS_URL;
    const manageCommunicationProps = {
      communicationStatus,
      communicationCategories,
      communicationNotDoneReasons,
      communicationMedia,
      episodeOfCares,
      selectedRecipients,
      selectedPatient,
      communication,
      practitioner,
      initialSelectedRecipients,
      editMode,
      selectedTask,
      selectedAppointment,
    };
    return (
      <Page>
        <Helmet>
          <title>Manage Communication</title>
          <meta name="description" content="Manage Communication page of Omnibus Care Plan application" />
        </Helmet>
        <PageHeader
          title={editingCommunication ?
            <FormattedMessage {...messages.updateModeTitle} /> :
            <FormattedMessage {...messages.createModeTitle} />}
          subtitle={<FormattedMessage {...messages.subtitle} />}
        />
        <PageContent>
          <ManageCommunication
            onSave={this.handleSave}
            datePickerMode={datePickerMode}
            patientUrl={patientUrl}
            {...manageCommunicationProps}
            handleOpen={this.handleOpen}
            handleRemoveRecipient={this.handleRemoveRecipient}
          >
          </ManageCommunication>
          <SearchRecipient
            initialSelectedRecipients={initialSelectedRecipients}
            communicationId={logicalId}
            isOpen={this.state.open}
            handleOpen={this.handleOpen}
            handleClose={this.handleClose}
          >
          </SearchRecipient>
        </PageContent>
      </Page>
    );
  }
}

ManageCommunicationPage.propTypes = {
  match: PropTypes.object.isRequired,
  location: PropTypes.object.isRequired,
  selectedPatient: PropTypes.object.isRequired,
  getLookups: PropTypes.func.isRequired,
  getPractitioner: PropTypes.func.isRequired,
  createCommunication: PropTypes.func.isRequired,
  updateCommunication: PropTypes.func.isRequired,
  removeSelectedRecipient: PropTypes.func.isRequired,
  communicationStatus: PropTypes.array.isRequired,
  episodeOfCares: PropTypes.array.isRequired,
  communicationCategories: PropTypes.array.isRequired,
  communicationNotDoneReasons: PropTypes.array.isRequired,
  communicationMedia: PropTypes.array.isRequired,
  selectedRecipients: PropTypes.array,
  tasks: PropTypes.object,
  appointments: PropTypes.object,
  communications: PropTypes.object,
  getEpisodeOfCares: PropTypes.func.isRequired,
  initializeSearchRecipients: PropTypes.func.isRequired,
  initializeListOfRecipients: PropTypes.func.isRequired,
  setInitialRecipients: PropTypes.func.isRequired,
};

const mapStateToProps = createStructuredSelector({
  selectedPatient: makeSelectPatient(),
  communicationStatus: makeSelectCommunicationStatus(),
  communicationCategories: makeSelectCommunicationCategories(),
  communicationNotDoneReasons: makeSelectCommunicationNotDoneReasons(),
  communicationMedia: makeSelectCommunicationMedia(),
  episodeOfCares: makeSelectEpisodeOfCares(),
  selectedRecipients: makeSelectSelectedRecipients(),
  practitioner: makeSelectPractitioner(),
  communications: makeSelectCommunications(),
  tasks: makeSelectTasks(),
  appointments: makeSelectUpcomingAppointments(),
});

function mapDispatchToProps(dispatch) {
  return {
    getLookups: () => dispatch(getLookupsAction([COMMUNICATION_STATUS, COMMUNICATION_CATEGORY, COMMUNICATION_NOT_DONE_REASON, COMMUNICATION_MEDIUM])),
    createCommunication: (communication, patientId, handleSubmitting) => dispatch(createCommunication(communication, patientId, handleSubmitting)),
    updateCommunication: (communication, patientId, handleSubmitting) => dispatch(updateCommunication(communication, patientId, handleSubmitting)),
    getEpisodeOfCares: (patientId) => dispatch(getEpisodeOfCares(patientId)),
    removeSelectedRecipient: (checked, recipientReference) => dispatch(removeSelectedRecipient(checked, recipientReference)),
    getPractitioner: (practitionerId) => dispatch(getPractitioner(practitionerId)),
    initializeSearchRecipients: () => dispatch(initializeSearchRecipients()),
    initializeListOfRecipients: () => dispatch(initializeListOfRecipients()),
    setInitialRecipients: (selectedRecipients) => dispatch(setInitialRecipients(selectedRecipients)),
  };
}

const withConnect = connect(mapStateToProps, mapDispatchToProps);

const withReducer = injectReducer({ key: 'manageCommunicationPage', reducer });
const withSaga = injectSaga({ key: 'manageCommunicationPage', saga });

export default compose(
  withReducer,
  withSaga,
  withConnect,
)(ManageCommunicationPage);
