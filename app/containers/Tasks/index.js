/**
 *
 * Tasks
 *
 */

import CenterAlign from 'components/Align/CenterAlign';
import Card from 'components/Card';

import CheckboxFilterGrid from 'components/CheckboxFilterGrid';
import FilterSection from 'components/FilterSection';
import InfoSection from 'components/InfoSection';
import InlineLabel from 'components/InlineLabel';
import NoResultsFoundText from 'components/NoResultsFoundText';
import PanelToolbar from 'components/PanelToolbar';
import LinearProgressIndicator from 'components/LinearProgressIndicator';
import SizedStickyDiv from 'components/StickyDiv/SizedStickyDiv';
import TaskTable from 'components/TaskTable';
import { getLookupsAction } from 'containers/App/actions';
import {
  CARE_COORDINATOR_ROLE_CODE,
  CARE_MANAGER_ROLE_CODE,
  DEFAULT_START_PAGE_NUMBER,
  MANAGE_COMMUNICATION_URL,
  MANAGE_TASK_URL,
  ORGANIZATION_ADMIN_ROLE_CODE,
  PATIENT_ROLE_CODE,
  TASK_STATUS,
  TO_DO_DEFINITION,
} from 'containers/App/constants';
import { makeSelectPatient, makeSelectUser } from 'containers/App/contextSelectors';
import { getPractitionerIdByRole } from 'containers/App/helpers';
import { makeSelectTaskStatuses } from 'containers/App/lookupSelectors';
import {
  CANCELLED_STATUS_CODE,
  COMPLETED_STATUS_CODE,
  FAILED_STATUS_CODE,
  SUMMARY_VIEW_WIDTH,
} from 'containers/Tasks/constants';
import isEmpty from 'lodash/isEmpty';
import isEqual from 'lodash/isEqual';
import uniqueId from 'lodash/uniqueId';
import { Checkbox } from 'material-ui';
import PropTypes from 'prop-types';
import React from 'react';
import { FormattedMessage } from 'react-intl';
import { connect } from 'react-redux';
import { compose } from 'redux';
import { createStructuredSelector } from 'reselect';
import { Cell, Grid } from 'styled-css-grid';
import injectReducer from 'utils/injectReducer';
import injectSaga from 'utils/injectSaga';
import { mapToPatientName } from 'utils/PatientUtils';
import CommunicationsTableDialog from 'components/CommunicationsTableDialog';
import { cancelTask, getTasks, initializeTasks, getTaskRelatedCommunications } from './actions';
import messages from './messages';
import reducer from './reducer';
import saga from './saga';
import {
  makeSelectTasks,
  makeSelectTaskRelatedCommunications,
} from './selectors';


export class Tasks extends React.Component { // eslint-disable-line react/prefer-stateless-function
  constructor(props) {
    super(props);
    this.state = {
      panelHeight: 0,
      filterHeight: 0,
      isPatientModalOpen: false,
      isExpanded: false,
      open: false,
    };
    this.cancelTask = this.cancelTask.bind(this);
    this.handlePanelResize = this.handlePanelResize.bind(this);
    this.handleFilterResize = this.handleFilterResize.bind(this);
    this.handleStatusListChange = this.handleStatusListChange.bind(this);
    this.handleDialogClose = this.handleDialogClose.bind(this);
    this.handleTaskRowClick = this.handleTaskRowClick.bind(this);
    this.onSize = this.onSize.bind(this);
    this.PATIENT_NAME_HTML_ID = uniqueId('patient_name_');
  }

  componentDidMount() {
    this.props.initializeTasks();
    this.props.getLookups();
    const { patient, user } = this.props;
    const practitionerId = getPractitionerIdByRole(user);
    if (patient) {
      this.props.getTasks(practitionerId, patient.id, []);
    }
  }

  componentWillReceiveProps(nextProps) {
    const { patient, user } = this.props;
    const { patient: newPatient } = nextProps;
    const practitionerId = getPractitionerIdByRole(user);
    if (!isEqual(patient, newPatient) && nextProps && nextProps.patient) {
      this.props.getTasks(practitionerId, nextProps.patient.id, this.state.statusList);
    }
  }

  onSize(size) {
    const isExpanded = size && size.width ? (Math.floor(size.width) > SUMMARY_VIEW_WIDTH) : false;
    this.setState({ isExpanded });
  }

  handleDialogClose() {
    this.setState({ open: false });
  }

  handleCommunicationPageClick(page) {
    console.log(page);
  }

  handleTaskRowClick(task) {
    const { patient } = this.props;
    this.props.getTaskRelatedCommunications(patient.id, task.logicalId, DEFAULT_START_PAGE_NUMBER);
    this.setState({ open: true });
  }

  handleStatusListChange(code, checked) {
    const { tasks: { statusList }, patient, user } = this.props;
    const filteredStatusList = statusList.filter((c) => c !== code);
    const newStatusList = checked ? [...filteredStatusList, code] : filteredStatusList;
    const practitionerId = getPractitionerIdByRole(user);
    this.props.getTasks(practitionerId || '', patient.id, newStatusList);
  }

  handleFilterResize(size) {
    this.setState({ filterHeight: size.height });
  }

  handlePanelResize(size) {
    this.setState({ panelHeight: size.height });
  }

  cancelTask(logicalId) {
    this.props.cancelTask(logicalId);
  }

  calculateCheckboxColumns({ length }) {
    return `100px repeat(${length < 1 ? 0 : length - 1},110px) 180px 1fr`;
  }

  renderFilter(taskStatus, statusList) {
    const filteredTaskStatuses = taskStatus.filter(({ code }) => code === CANCELLED_STATUS_CODE
      || code === FAILED_STATUS_CODE
      || code === COMPLETED_STATUS_CODE);
    return (
      <FilterSection>
        <CheckboxFilterGrid columns={this.calculateCheckboxColumns(filteredTaskStatuses)}>
          <Cell><CenterAlign><FormattedMessage {...messages.includeLabel} /></CenterAlign></Cell>
          {filteredTaskStatuses.map(({ code, display }) => (
            <Cell key={code}>
              <CenterAlign>
                <Checkbox
                  name={code}
                  checked={statusList && statusList.includes(code)}
                  label={display}
                  onCheck={(event, checked) => this.handleStatusListChange(code, checked)}
                />
              </CenterAlign>
            </Cell>
          ))
          }
        </CheckboxFilterGrid>
      </FilterSection>);
  }

  render() {
    const { tasks: { loading, data, statusList }, patient, user, taskStatus, communications } = this.props;
    let taskList = data;
    if (!isEmpty(data)) {
      taskList = data.filter((task) => task.description !== TO_DO_DEFINITION);
    }
    const patientName = mapToPatientName(patient);
    const practitionerId = getPractitionerIdByRole(user);
    let createTaskUrl;
    let addNewItem;
    if (practitionerId && !isEmpty(patient) && !isEmpty(patient.id)) {
      createTaskUrl = `${MANAGE_TASK_URL}?patientId=${patient.id}&isMainTask=true`;
      addNewItem = {
        labelName: <FormattedMessage {...messages.buttonLabelCreateNew} />,
        linkUrl: createTaskUrl,
      };
    }
    const isPatient = user && user.role && user.role === PATIENT_ROLE_CODE;
    return (
      <Card minWidth={'auto'}>
        <PanelToolbar
          addNewItem={addNewItem}
          allowedAddNewItemRoles={[CARE_COORDINATOR_ROLE_CODE, CARE_MANAGER_ROLE_CODE, ORGANIZATION_ADMIN_ROLE_CODE]}
          showSearchIcon={false}
          showUploadIcon={false}
          showSettingIcon={false}
          showFilterIcon={false}
          onSize={this.handlePanelResize}
        />
        <LinearProgressIndicator loading={loading} />
        {isEmpty(patientName) ?
          <NoResultsFoundText><FormattedMessage {...messages.patientNotSelected} /></NoResultsFoundText>
          :
          <SizedStickyDiv onSize={this.handleFilterResize} top={`${this.state.panelHeight}px`}>
            <Grid columns={1} gap="">
              <Cell>
                <InfoSection margin="0px">
                  The <FormattedMessage {...messages.tasks} /> for&nbsp;
                  <InlineLabel htmlFor={this.PATIENT_NAME_HTML_ID}>
                    <span id={this.PATIENT_NAME_HTML_ID}>{patientName}</span>&nbsp;
                  </InlineLabel>
                  are :
                </InfoSection>
              </Cell>
              {!isEmpty(taskList) && this.state.isExpanded &&
              <Cell>
                {this.renderFilter(taskStatus, statusList)}
              </Cell>
              }
            </Grid>
          </SizedStickyDiv>
        }

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
              onSize={this.onSize}
              isExpanded={this.state.isExpanded}
              isPatient={isPatient}
              onTaskClick={this.handleTaskRowClick}
            />
          </CenterAlign>
        </div>
        }
        <CommunicationsTableDialog
          isLoading={false}
          open={this.state.open}
          handleDialogClose={this.handleDialogClose}
          data={communications}
          selectedPatient={patient}
          handleChangePage={this.handleCommunicationPageClick}
          manageCommunicationBaseUrl={MANAGE_COMMUNICATION_URL}
        ></CommunicationsTableDialog>
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
    statusList: PropTypes.arrayOf(PropTypes.string),
  }),
  patient: PropTypes.object,
  user: PropTypes.object,
  taskStatus: PropTypes.array,
  communications: PropTypes.object,
  getLookups: PropTypes.func.isRequired,
  getTaskRelatedCommunications: PropTypes.func.isRequired,
};

const mapStateToProps = createStructuredSelector({
  tasks: makeSelectTasks(),
  patient: makeSelectPatient(),
  user: makeSelectUser(),
  taskStatus: makeSelectTaskStatuses(),
  communications: makeSelectTaskRelatedCommunications(),
});

function mapDispatchToProps(dispatch) {
  return {
    getLookups: () => dispatch(getLookupsAction([TASK_STATUS])),
    getTasks: (practitionerId, patientId, statusList) => dispatch(getTasks(practitionerId, patientId, statusList)),
    initializeTasks: () => dispatch(initializeTasks()),
    cancelTask: (id) => dispatch(cancelTask(id)),
    getTaskRelatedCommunications: (patient, taskId, pageNumber) => dispatch(getTaskRelatedCommunications(patient, taskId, pageNumber)),
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
