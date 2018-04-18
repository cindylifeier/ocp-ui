/**
 *
 * Tasks
 *
 */

import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { FormattedMessage } from 'react-intl';
import { createStructuredSelector } from 'reselect';
import { compose } from 'redux';
import isEmpty from 'lodash/isEmpty';
import uniqueId from 'lodash/uniqueId';
import isEqual from 'lodash/isEqual';
import injectSaga from 'utils/injectSaga';
import injectReducer from 'utils/injectReducer';
import { mapToPatientName } from 'utils/PatientUtils';
import { CARE_COORDINATOR_ROLE_CODE,
  MANAGE_COMMUNICATION_URL,
  MANAGE_TASK_URL,
  TO_DO_DEFINITION } from 'containers/App/constants';
import { makeSelectPatient, makeSelectUser } from 'containers/App/contextSelectors';
import RefreshIndicatorLoading from 'components/RefreshIndicatorLoading';
import Card from 'components/Card';
import CenterAlign from 'components/Align/CenterAlign';
import InfoSection from 'components/InfoSection';
import InlineLabel from 'components/InlineLabel';
import NoResultsFoundText from 'components/NoResultsFoundText';
import SizedStickyDiv from 'components/StickyDiv/SizedStickyDiv';
import TaskTable from 'components/TaskTable';
import PanelToolbar from 'components/PanelToolbar';
import makeSelectTasks from './selectors';
import reducer from './reducer';
import saga from './saga';
import messages from './messages';
import { cancelTask, getTasks, initializeTasks } from './actions';

export class Tasks extends React.Component { // eslint-disable-line react/prefer-stateless-function
  constructor(props) {
    super(props);
    this.state = {
      panelHeight: 0,
      filterHeight: 0,
      practitionerId: 1961,
      isPatientModalOpen: false,
    };
    this.cancelTask = this.cancelTask.bind(this);
    this.handlePanelResize = this.handlePanelResize.bind(this);
    this.handleFilterResize = this.handleFilterResize.bind(this);
    this.PATIENT_NAME_HTML_ID = uniqueId('patient_name_');
  }

  componentDidMount() {
    this.props.initializeTasks();
    const { patient } = this.props;
    if (patient) {
      this.props.getTasks(this.state.practitionerId, patient.id);
    }
  }

  componentWillReceiveProps(nextProps) {
    const { patient } = this.props;
    const { patient: newPatient } = nextProps;
    if (!isEqual(patient, newPatient)) {
      this.props.getTasks(this.state.practitionerId, nextProps.patient.id);
    }
  }

  handlePanelResize(size) {
    this.setState({ panelHeight: size.height });
  }

  handleFilterResize(size) {
    this.setState({ filterHeight: size.height });
  }

  cancelTask(logicalId) {
    this.props.cancelTask(logicalId);
  }

  render() {
    const { tasks: { loading, data }, patient } = this.props;
    let taskList = data;
    if (!isEmpty(data)) {
      taskList = data.filter((task) => task.description !== TO_DO_DEFINITION);
    }
    const patientName = mapToPatientName(patient);

    let createTaskUrl;
    let addNewItem;
    if (this.state.practitionerId && !isEmpty(patient) && !isEmpty(patient.id)) {
      createTaskUrl = `${MANAGE_TASK_URL}?patientId=${patient.id}&isMainTask=true`;
      addNewItem = {
        labelName: <FormattedMessage {...messages.buttonLabelCreateNew} />,
        linkUrl: createTaskUrl,
      };
    }


    return (
      <Card minWidth={'auto'}>
        <PanelToolbar
          addNewItem={addNewItem}
          allowedAddNewItemRoles={CARE_COORDINATOR_ROLE_CODE}
          showSearchIcon={false}
          onSize={this.handlePanelResize}
        />
        {isEmpty(patientName) ?
          <h4><FormattedMessage {...messages.patientNotSelected} /></h4>
          :
          <SizedStickyDiv onSize={this.handleFilterResize} top={`${this.state.panelHeight}px`}>
            <InfoSection margin="0px">
                The <FormattedMessage {...messages.tasks} /> for&nbsp;
                <InlineLabel htmlFor={this.PATIENT_NAME_HTML_ID}>
                  <span id={this.PATIENT_NAME_HTML_ID}>{patientName}</span>&nbsp;
                </InlineLabel>
                are :
            </InfoSection>
          </SizedStickyDiv>
        }

        {loading &&
        <RefreshIndicatorLoading />}

        {!loading && !isEmpty(patientName) && !isEmpty(patient.id) && isEmpty(taskList) &&
        <NoResultsFoundText>
          <FormattedMessage {...messages.noTasksFound} />
        </NoResultsFoundText>}

        {!isEmpty(taskList) &&
        <div>
          <CenterAlign>
            <TaskTable
              relativeTop={this.state.panelHeight + this.state.filterHeight}
              elements={taskList}
              cancelTask={this.cancelTask}
              patientId={patient.id}
              communicationBaseUrl={MANAGE_COMMUNICATION_URL}
              taskBaseUrl={MANAGE_TASK_URL}
            />
          </CenterAlign>
        </div>
        }
      </Card>
    );
  }
}

Tasks.propTypes = {
  initializeTasks: PropTypes.func.isRequired,
  cancelTask: PropTypes.func.isRequired,
  getTasks: PropTypes.func.isRequired,
  tasks: PropTypes.shape({
    loading: PropTypes.bool.isRequired,
  }),
  patient: PropTypes.object,
};

const mapStateToProps = createStructuredSelector({
  tasks: makeSelectTasks(),
  patient: makeSelectPatient(),
  user: makeSelectUser(),
});

function mapDispatchToProps(dispatch) {
  return {
    getTasks: (practitionerId, patientId) => dispatch(getTasks(practitionerId, patientId)),
    initializeTasks: () => dispatch(initializeTasks()),
    cancelTask: (id) => dispatch(cancelTask(id)),
  };
}

const withConnect = connect(mapStateToProps, mapDispatchToProps);

const withReducer = injectReducer({ key: 'tasks', reducer });
const withSaga = injectSaga({ key: 'tasks', saga });

export default compose(
  withReducer,
  withSaga,
  withConnect,
)(Tasks);
