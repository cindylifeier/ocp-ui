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
import { createStructuredSelector } from 'reselect';
import { compose } from 'redux';
import merge from 'lodash/merge';
import injectSaga from 'utils/injectSaga';
import injectReducer from 'utils/injectReducer';
import { makeSelectEpisodeOfCares, makeSelectPractitioner } from 'containers/ManageCommunicationPage/selectors';
import SearchRecipient from 'containers/SearchRecipient';
import Page from 'components/Page';
import {
  initializeListOfRecipients, initializeSearchRecipients,
  removeSelectedRecipient,
} from 'containers/SearchRecipient/actions';
import { makeSelectSelectedRecipients } from 'containers/SearchRecipient/selectors';
import PageHeader from 'components/PageHeader';
import PageContent from 'components/PageContent';
import ManageCommunication from 'components/ManageCommunication';
import reducer from './reducer';
import saga from './saga';
import messages from './messages';

import { getLookupsAction } from '../App/actions';
import { createCommunication, updateCommunication, getEpisodeOfCares,
  getPractitioner } from './actions';
import makeSelectSelectedPatient from '../App/sharedDataSelectors';
import {
  makeSelectCommunicationCategories, makeSelectCommunicationStatus, makeSelectCommunicationMedia,
  makeSelectCommunicationNotDoneReasons,
} from '../App/lookupSelectors';
import {
  COMMUNICATION_CATEGORY, COMMUNICATION_STATUS, COMMUNICATION_MEDIUM,
  COMMUNICATION_NOT_DONE_REASON,
} from '../App/constants';


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
    // Logged in Practitioner
    this.props.getPractitioner(this.state.practitionerId);
    this.props.getLookups();
    this.props.getEpisodeOfCares(this.props.selectedPatient.id);
    this.props.initializeSearchRecipients();
  }
  handleClose() {
    this.setState({ open: false });
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
  render() {
    const editingCommunication = false;
    const communicationId = this.props.match.params.id;
    const {
      communicationStatus,
      communicationCategories,
      communicationNotDoneReasons,
      communicationMedia,
      episodeOfCares,
      selectedRecipients,
      selectedPatient,
      // practitioner, // TODO fix delay in getting practitioner
    } = this.props;
    console.log(this.props.practitioner);
    const practitioner = this.state.selectedPractitioner;
    const manageCommunicationProps = {
      communicationStatus,
      communicationCategories,
      communicationNotDoneReasons,
      communicationMedia,
      episodeOfCares,
      selectedRecipients,
      selectedPatient,
      practitioner,
    };
    const initialSelectedRecipients = [];
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
            {...manageCommunicationProps}
            // removeRecipient={this.handleRemoveRecipient}
            handleOpen={this.handleOpen}
            handleRemoveRecipient={this.handleRemoveRecipient}
          >
          </ManageCommunication>
          <SearchRecipient
            initialSelectedRecipients={initialSelectedRecipients}
            communicationId={communicationId}
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
  getEpisodeOfCares: PropTypes.func.isRequired,
  practitioner: PropTypes.object.isRequired,
  initializeSearchRecipients: PropTypes.func.isRequired,
  initializeListOfRecipients: PropTypes.func.isRequired,
};

const mapStateToProps = createStructuredSelector({
  selectedPatient: makeSelectSelectedPatient(),
  communicationStatus: makeSelectCommunicationStatus(),
  communicationCategories: makeSelectCommunicationCategories(),
  communicationNotDoneReasons: makeSelectCommunicationNotDoneReasons(),
  communicationMedia: makeSelectCommunicationMedia(),
  episodeOfCares: makeSelectEpisodeOfCares(),
  selectedRecipients: makeSelectSelectedRecipients(),
  practitioner: makeSelectPractitioner(),
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
