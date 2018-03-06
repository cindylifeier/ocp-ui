/**
 *
 * ManageTaskPage
 *
 */

import React from 'react';

import Divider from 'material-ui/Divider';
import PropTypes from 'prop-types';
import queryString from 'query-string';
import { Helmet } from 'react-helmet';
import { connect } from 'react-redux';
import { createStructuredSelector } from 'reselect';
import { compose } from 'redux';
import { FormattedMessage } from 'react-intl';
import Util from 'utils/Util';
import merge from 'lodash/merge';
import find from 'lodash/find';
import injectSaga from 'utils/injectSaga';
import injectReducer from 'utils/injectReducer';
import ManageTask from 'components/ManageTask';
import makeSelectSelectedPatient from 'containers/App/sharedDataSelectors';
import { createTask, getActivityDefinitions, getOrganization, getPractitioners, getEventTypes, getTaskById, updateTask } from 'containers/ManageTaskPage/actions';
import { REQUEST_INTENT, REQUEST_PRIORITY, TASK_PERFORMER_TYPE, TASK_STATUS } from 'containers/App/constants';
import isUndefined from 'lodash/isUndefined';
import { getLookupsAction, getPatient } from 'containers/App/actions';
import { makeSelectRequestIntents, makeSelectRequestPriorities, makeSelectTaskPerformerTypes, makeSelectTaskStatuses } from 'containers/App/lookupSelectors';
import makeSelectTasks from 'containers/Tasks/selectors';
import { makeSelectActivityDefinitions, makeSelectOrganization, makeSelectPractitioners } from './selectors';
import reducer from './reducer';
import saga from './saga';
import styles from './styles.css';
import messages from './messages';


export class ManageTaskPage extends React.PureComponent { // eslint-disable-line react/prefer-stateless-function
  constructor(props) {
    super(props);
    this.handleSave = this.handleSave.bind(this);
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
    // get specific organization
    this.props.getOrganization();
    // get Activityt Definitions-for a specific organization
    this.props.getActivityDefinitions('902');
    // get practitioners for htat patient careteam pracitioner role
    // get specific organization
    this.props.getPractitioners();

    // get episode of cares for a patient
    this.props.getEventTypes();
  }

  handleSave(taskFormData, actions) {
    const taskDataToSubmit = {};
    const {
      activityDefinition, practitioners, status, priority, intent, taskOwner, performerType, description, comments, taskStart, taskEnd,
    } = taskFormData;

    let logicalId;
    logicalId = activityDefinition;
    const selectedActivityDefinition = find(this.props.activityDefinitions, { logicalId });
    taskDataToSubmit.definition = {
      reference: `ActivityDefinition/${logicalId}`,
      display: selectedActivityDefinition.name,
    };

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

    logicalId = practitioners;
    const selectedAgent = find(this.props.practitioners, { logicalId });
    let name = getResourceDisplayName(selectedAgent);
    taskDataToSubmit.agent = {
      reference: `Practitioner/${logicalId}`,
      display: name,
    };

    logicalId = taskOwner;
    const selectedTaskOwner = find(this.props.practitioners, { logicalId });
    name = getResourceDisplayName(selectedTaskOwner);
    taskDataToSubmit.owner = {
      reference: `Practitioner/${logicalId}`,
      display: name,
    };

    // patient
    const patientId = this.props.selectedPatient.id;
    name = getResourceDisplayName(this.props.selectedPatient);
    taskDataToSubmit.beneficiary = {
      reference: `Patient/${patientId}`,
      display: name,
    };

    // Optional Fields
    if (description) {
      taskDataToSubmit.description = description;
    }
    if (comments) {
      taskDataToSubmit.note = comments;
    }
    if (taskStart || taskEnd) {
      taskDataToSubmit.executionPeriod = {
        start: formatDate(taskStart),
        end: formatDate(taskEnd),
      };
    }

    logicalId = this.props.match.params.id;
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
      selectedPatient,
      organization,
      activityDefinitions,
      practitioners,
    } = this.props;
    const logicalId = this.props.match.params.id;
    const editMode = !isUndefined(match.params.id);
    let currentTask = null;
    if (editMode) {
      currentTask = find(this.props.tasks.data.elements, { logicalId });
    }
    const taskProps = {
      taskStatus,
      requestIntent,
      requestPriority,
      taskPerformerType,
      selectedPatient,
      organization,
      activityDefinitions,
      practitioners,
      editMode,
      currentTask,
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
      id: PropTypes.string.isRequired,
    }),
    path: PropTypes.string,
    url: PropTypes.string,
  }).isRequired,
  getLookups: PropTypes.func.isRequired,
  getPatient: PropTypes.func.isRequired,
  getOrganization: PropTypes.func.isRequired,
  getPractitioners: PropTypes.func.isRequired,
  getEventTypes: PropTypes.func.isRequired,
  getActivityDefinitions: PropTypes.func.isRequired,
  organization: PropTypes.any,
  tasks: PropTypes.any,
  practitioners: PropTypes.any,
  activityDefinitions: PropTypes.any,
  taskStatus: PropTypes.array,
  requestIntent: PropTypes.array,
  requestPriority: PropTypes.array,
  taskPerformerType: PropTypes.array,
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
  selectedPatient: makeSelectSelectedPatient(),
  organization: makeSelectOrganization(),
  activityDefinitions: makeSelectActivityDefinitions(),
  practitioners: makeSelectPractitioners(),
  tasks: makeSelectTasks(),
});

function mapDispatchToProps(dispatch) {
  return {
    getLookups: () => dispatch(getLookupsAction([TASK_STATUS, REQUEST_INTENT, REQUEST_PRIORITY, TASK_PERFORMER_TYPE])),
    getPatient: (patientId) => dispatch(getPatient(patientId)),
    getOrganization: () => dispatch(getOrganization()),
    getActivityDefinitions: (organizationId) => dispatch(getActivityDefinitions(organizationId)),
    getEventTypes: (patientId) => dispatch(getEventTypes(patientId)),
    getPractitioners: () => dispatch(getPractitioners()),
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

function formatDate(date) {
  const year = date.getFullYear();

  let month = (1 + date.getMonth()).toString();
  month = month.length > 1 ? month : `0${month}`;

  let day = date.getDate().toString();
  day = day.length > 1 ? day : `0${day}`;

  return `${month}/${day}/${year}`;
}

const withConnect = connect(mapStateToProps, mapDispatchToProps);

const withReducer = injectReducer({ key: 'manageTaskPage', reducer });
const withSaga = injectSaga({ key: 'manageTaskPage', saga });

export default compose(
  withReducer,
  withSaga,
  withConnect,
)(ManageTaskPage);
