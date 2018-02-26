/**
 *
 * ManageTaskPage
 *
 */

import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { Helmet } from 'react-helmet';
import queryString from 'query-string';
import { FormattedMessage } from 'react-intl';
import Divider from 'material-ui/Divider';
import { createStructuredSelector } from 'reselect';
import { compose } from 'redux';

import find from 'lodash/find';
import injectSaga from 'utils/injectSaga';
import injectReducer from 'utils/injectReducer';
import reducer from './reducer';
import saga from './saga';
import messages from './messages';
import ManageTask from '../../components/ManageTask';
import { TASK_STATUS, REQUEST_INTENT, REQUEST_PRIORITY, TASK_PERFORMER_TYPE } from '../App/constants';
import { makeSelectOrganization, makeSelectPatient, makeSelectActivityDefinitions, makeSelectPractitioners } from './selectors';
import { getLookupsAction } from '../App/actions';
import { makeSelectRequestIntents, makeSelectRequestPriorities, makeSelectTaskPerformerTypes, makeSelectTaskStatuses } from '../App/lookupSelectors';
import styles from './styles.css';
import { getOrganization, getPatient, getActivityDefinitions, getPractitioners, createTask } from './actions';
import Util from '../../utils/Util';

export class ManageTaskPage extends React.PureComponent { // eslint-disable-line react/prefer-stateless-function
  constructor(props) {
    super(props);
    this.handleSave = this.handleSave.bind(this);
  }

  componentWillMount() {
    this.props.getLookups();
  }

  componentDidMount() {
    const queryObj = queryString.parse(this.props.location.search);
    const patientId = queryObj.patientId;
    if (patientId) {
      this.props.getPatient(patientId);
    }
    // get specific organization
    this.props.getOrganization();
    // get Activityt Definitions-for a specific organization
    this.props.getActivityDefinitions('275284');
    // get practitioners for htat patient careteam pracitioner role
    // get specific organization
    this.props.getPractitioners();
  }

  handleSave(taskFormData, actions) {
    console.log(taskFormData);
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
    if (description) { taskDataToSubmit.description = description; }
    if (comments) { taskDataToSubmit.note = comments; }
    if (taskStart || taskEnd) {
      const startDate = Util.setEmptyStringWhenUndefined(taskStart);
      const endDate = Util.setEmptyStringWhenUndefined(taskEnd);
      taskDataToSubmit.executionPeriod = {
        start: startDate,
        end: endDate,
      };
    }


    console.log(taskDataToSubmit);
    this.props.createTask(taskDataToSubmit, () => actions.setSubmitting(false));
  }

  render() {
    const {
      taskStatus,
      requestIntent,
      requestPriority,
      taskPerformerType,
      selectedPatient,
      organization,
      activityDefinitions,
      practitioners,
    } = this.props;
    const taskProps = {
      taskStatus,
      requestIntent,
      requestPriority,
      taskPerformerType,
      selectedPatient,
      organization,
      activityDefinitions,
      practitioners,
    };

    return (
      <div>
        <Helmet>
          <title>Manage Task</title>
          <meta name="description" content="Manage Task page of Omnibus Care Plan application" />
        </Helmet>
        <div className={styles.wrapper}>
          <div className={styles.header}>
            <FormattedMessage {...messages.createHeader} />
          </div>
          <Divider />
          <ManageTask {...taskProps} onSave={this.handleSave} />
        </div>
      </div>
    );
  }
}

ManageTaskPage.propTypes = {
  getLookups: PropTypes.func.isRequired,
  getPatient: PropTypes.func.isRequired,
  getOrganization: PropTypes.func.isRequired,
  getPractitioners: PropTypes.func.isRequired,
  getActivityDefinitions: PropTypes.func.isRequired,
  organization: PropTypes.any,
  practitioners: PropTypes.any,
  activityDefinitions: PropTypes.any,
  taskStatus: PropTypes.array,
  requestIntent: PropTypes.array,
  requestPriority: PropTypes.array,
  taskPerformerType: PropTypes.array,
  location: PropTypes.object,
  selectedPatient: PropTypes.object,
  createTask: PropTypes.func,
};

const mapStateToProps = createStructuredSelector({
  taskStatus: makeSelectTaskStatuses(),
  requestIntent: makeSelectRequestIntents(),
  requestPriority: makeSelectRequestPriorities(),
  taskPerformerType: makeSelectTaskPerformerTypes(),
  selectedPatient: makeSelectPatient(),
  organization: makeSelectOrganization(),
  activityDefinitions: makeSelectActivityDefinitions(),
  practitioners: makeSelectPractitioners(),
});

function mapDispatchToProps(dispatch) {
  return {
    getLookups: () => dispatch(getLookupsAction([TASK_STATUS, REQUEST_INTENT, REQUEST_PRIORITY, TASK_PERFORMER_TYPE])),
    getPatient: (patientId) => dispatch(getPatient(patientId)),
    getOrganization: () => dispatch(getOrganization()),
    getActivityDefinitions: (organizationId) => dispatch(getActivityDefinitions(organizationId)),
    getPractitioners: () => dispatch(getPractitioners()),
    createTask: (taskFormData, handleSubmitting) => dispatch(createTask(taskFormData, handleSubmitting)),

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
