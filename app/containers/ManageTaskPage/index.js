/**
 *
 * ManageTaskPage
 *
 */

import React from 'react';
import PropTypes from 'prop-types';
import Divider from 'material-ui/Divider';
import queryString from 'query-string';
import { Helmet } from 'react-helmet';
import { connect } from 'react-redux';
import { createStructuredSelector } from 'reselect';
import { compose } from 'redux';
import { FormattedMessage } from 'react-intl';
import Util from 'utils/Util';
import merge from 'lodash/merge';
import find from 'lodash/find';
import isUndefined from 'lodash/isUndefined';

import injectSaga from 'utils/injectSaga';
import injectReducer from 'utils/injectReducer';
import ManageTask from 'components/ManageTask';
import makeSelectSelectedPatient from 'containers/App/sharedDataSelectors';
import { REQUEST_INTENT, REQUEST_PRIORITY, TASK_PERFORMER_TYPE, TASK_STATUS } from 'containers/App/constants';
import { getLookupsAction, getPatient } from 'containers/App/actions';
import { makeSelectRequestIntents, makeSelectRequestPriorities, makeSelectTaskPerformerTypes, makeSelectTaskStatuses } from 'containers/App/lookupSelectors';
import makeSelectTasks from 'containers/Tasks/selectors';
import { makeSelectActivityDefinitions, makeSelectOrganization, makeSelectPractitioners, makeSelectPractitioner, makeSelectEventTypes, makeSelectTasksByPatient } from './selectors';
import { createTask, getActivityDefinitions, getOrganization, getRequester, getPractitioners, getEventTypes, getTaskById, updateTask, getTasksByPatient } from './actions';
import reducer from './reducer';
import saga from './saga';
import styles from './styles.css';
import messages from './messages';

export class ManageTaskPage extends React.PureComponent { // eslint-disable-line react/prefer-stateless-function
  constructor(props) {
    super(props);
    this.handleSave = this.handleSave.bind(this);
    this.state = {
      /* practitionerId: 1697,*/
      practitionerId: 1377,
    };
  }

  componentWillMount() {
    this.props.getLookups();
    const logicalId = this.props.match.params.id;
    if (logicalId) {
      this.props.getTask(logicalId);
    }
    const queryObj = queryString.parse(this.props.location.search);
    const patientId = queryObj.patientId;
    if (patientId) {
      this.props.getPatient(patientId);
    }
    // get organization for the given practitioner
    this.props.getOrganization(this.state.practitionerId);
    // get practitioner details for the given practitioner
    this.props.getRequester(this.state.practitionerId);
    // get Activity Definitions-for for the given practitioner
    this.props.getActivityDefinitions(this.state.practitionerId);
    // get practitioners belonging to requestor organization
    this.props.getPractitioners(this.state.practitionerId);

    // get episode of cares for the given patient
    this.props.getEventTypes(patientId);
    // get the existing tasks for the patient
    this.props.getTasksByPatient(patientId);
  }

  handleSave(taskFormData, actions) {
    const taskDataToSubmit = {};
    const {
      activityDefinition, status, priority, intent, taskOwner, eventTypes, partOf, performerType, description, comments, taskStart, taskEnd,
    } = taskFormData;

    let reference = activityDefinition;
    taskDataToSubmit.definition = find(this.props.activityDefinitions, { reference });

    let code;
    code = status;
    taskDataToSubmit.status = find(this.props.taskStatus, { code });

    code = priority;
    taskDataToSubmit.priority = find(this.props.requestPriority, { code });

    code = intent;
    taskDataToSubmit.intent = find(this.props.requestIntent, { code });

    code = intent;
    taskDataToSubmit.intent = find(this.props.requestIntent, { code });

    code = performerType;
    taskDataToSubmit.performerType = find(this.props.taskPerformerType, { code });

    const creator = this.props.requester;
    reference = `Practitioner/${creator.logicalId}`;
    taskDataToSubmit.agent = find(this.props.practitioners, { reference });

    reference = taskOwner;
    taskDataToSubmit.owner = find(this.props.practitioners, { reference });


    // patient
    const patientId = this.props.selectedPatient.id;
    const name = getResourceDisplayName(this.props.selectedPatient);
    taskDataToSubmit.beneficiary = {
      reference: `Patient/${patientId}`,
      display: name,
    };

    // creator organization -- assumption only one org per application context
    taskDataToSubmit.organization = this.props.organization[0];

    // Optional Fields
    if (eventTypes) {
      reference = eventTypes;
      taskDataToSubmit.context = find(this.props.eventTypes, { reference });
    }

    if (partOf) {
      reference = partOf;
      taskDataToSubmit.partOf = find(this.props.tasksByPatient, { reference });
    }
    if (description) {
      taskDataToSubmit.description = description;
    }
    if (comments) {
      taskDataToSubmit.note = comments;
    }
    if (taskStart || taskEnd) {
      taskDataToSubmit.executionPeriod = {
        start: Util.formatDate(taskStart),
        end: Util.formatDate(taskEnd),
      };
    }

    const logicalId = this.props.match.params.id;
    if (logicalId) {
      merge(taskDataToSubmit, { logicalId });
      this.props.updateTask(taskDataToSubmit, () => actions.setSubmitting(false));
    } else {
      this.props.createTask(taskDataToSubmit, () => actions.setSubmitting(false));
    }
  }

  render() {
    const {
      match,
      taskStatus,
      requestIntent,
      requestPriority,
      taskPerformerType,
      eventTypes,
      selectedPatient,
      organization,
      activityDefinitions,
      practitioners,
      requester,
      tasksByPatient,
    } = this.props;
    const logicalId = this.props.match.params.id;
    const editMode = !isUndefined(match.params.id);
    let currentTask = null;
    if (editMode && this.props.tasks) {
      currentTask = find(this.props.tasks.data.elements, { logicalId });
    }
    const taskProps = {
      taskStatus,
      requestIntent,
      requestPriority,
      taskPerformerType,
      eventTypes,
      selectedPatient,
      organization,
      activityDefinitions,
      practitioners,
      requester,
      editMode,
      currentTask,
      tasksByPatient,
    };

    return (
      <div>
        <Helmet>
          <title>Manage Task</title>
          <meta name="description" content="Manage Task page of Omnibus Care Plan application" />
        </Helmet>
        <div className={styles.wrapper}>
          <div className={styles.header}>
            {logicalId ? <FormattedMessage {...messages.updateHeader} />
              : <FormattedMessage {...messages.createHeader} />}
          </div>
          <Divider />
          <ManageTask {...taskProps} onSave={this.handleSave} />
        </div>
      </div>
    );
  }
}

ManageTaskPage.propTypes = {
  match: PropTypes.shape({
    params: PropTypes.shape({
      id: PropTypes.string,
    }),
    path: PropTypes.string,
    url: PropTypes.string,
  }).isRequired,
  getLookups: PropTypes.func.isRequired,
  getPatient: PropTypes.func.isRequired,
  getOrganization: PropTypes.func.isRequired,
  getRequester: PropTypes.func,
  getPractitioners: PropTypes.func.isRequired,
  getEventTypes: PropTypes.func.isRequired,
  getActivityDefinitions: PropTypes.func.isRequired,
  getTasksByPatient: PropTypes.func.isRequired,
  organization: PropTypes.arrayOf((PropTypes.shape({
    reference: PropTypes.string.isRequired,
    display: PropTypes.string.isRequired,
  }))),
  tasksByPatient: PropTypes.arrayOf((PropTypes.shape({
    reference: PropTypes.string.isRequired,
    display: PropTypes.string.isRequired,
  }))),
  tasks: PropTypes.any,
  practitioners: PropTypes.any,
  requester: PropTypes.object,
  activityDefinitions: PropTypes.any,
  taskStatus: PropTypes.array,
  requestIntent: PropTypes.array,
  requestPriority: PropTypes.array,
  taskPerformerType: PropTypes.array,
  eventTypes: PropTypes.array,
  location: PropTypes.object,
  selectedPatient: PropTypes.object,
  createTask: PropTypes.func,
  getTask: PropTypes.func,
  updateTask: PropTypes.func,
};

const mapStateToProps = createStructuredSelector({
  taskStatus: makeSelectTaskStatuses(),
  requestIntent: makeSelectRequestIntents(),
  requestPriority: makeSelectRequestPriorities(),
  taskPerformerType: makeSelectTaskPerformerTypes(),
  eventTypes: makeSelectEventTypes(),
  selectedPatient: makeSelectSelectedPatient(),
  organization: makeSelectOrganization(),
  activityDefinitions: makeSelectActivityDefinitions(),
  practitioners: makeSelectPractitioners(),
  requester: makeSelectPractitioner(),
  tasks: makeSelectTasks(),
  tasksByPatient: makeSelectTasksByPatient(),
});

function mapDispatchToProps(dispatch) {
  return {
    getLookups: () => dispatch(getLookupsAction([TASK_STATUS, REQUEST_INTENT, REQUEST_PRIORITY, TASK_PERFORMER_TYPE])),
    getPatient: (patientId) => dispatch(getPatient(patientId)),
    getOrganization: (practitionerId) => dispatch(getOrganization(practitionerId)),
    getRequester: (practitionerId) => dispatch(getRequester(practitionerId)),
    getActivityDefinitions: (practitionerId) => dispatch(getActivityDefinitions(practitionerId)),
    getTasksByPatient: (patientId) => dispatch(getTasksByPatient(patientId)),
    getEventTypes: (patientId) => dispatch(getEventTypes(patientId)),
    getPractitioners: (practitionerId) => dispatch(getPractitioners(practitionerId)),
    createTask: (taskFormData, handleSubmitting) => dispatch(createTask(taskFormData, handleSubmitting)),
    getTask: (logicalId) => dispatch(getTaskById(logicalId)),
    updateTask: (taskFormData, handleSubmitting) => dispatch(updateTask(taskFormData, handleSubmitting)),
  };
}

function getResourceDisplayName(resource) {
  let name = {};
  if (resource.name.length > 0) {
    const fName = resource.name[0];
    const firstName = Util.setEmptyStringWhenUndefined(fName.firstName);
    const lastName = Util.setEmptyStringWhenUndefined(fName.lastName);
    name = `${firstName}-${lastName}`;
  }
  return name;
}

const withConnect = connect(mapStateToProps, mapDispatchToProps);

const withReducer = injectReducer({ key: 'manageTaskPage', reducer });
const withSaga = injectSaga({ key: 'manageTaskPage', saga });

export default compose(
  withReducer,
  withSaga,
  withConnect,
)(ManageTaskPage);
