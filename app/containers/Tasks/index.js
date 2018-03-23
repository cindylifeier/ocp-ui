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
import { MANAGE_COMMUNICATION_URL, MANAGE_TASK_URL, PATIENT_ROLE_VALUE } from 'containers/App/constants';
import { makeSelectPatient, makeSelectUser } from 'containers/App/contextSelectors';
import RefreshIndicatorLoading from 'components/RefreshIndicatorLoading';
import TaskTable from 'components/TaskTable';
import Card from 'components/Card';
import InfoSection from 'components/InfoSection';
import InlineLabel from 'components/InlineLabel';
import NoResultsFoundText from 'components/NoResultsFoundText';
import CenterAlign from 'components/Align/CenterAlign';
import PanelToolbar from 'components/PanelToolbar';
import makeSelectTasks from './selectors';
import reducer from './reducer';
import saga from './saga';
import messages from './messages';
import { cancelTask, getTasks, initializeTasks } from './actions';

export class Tasks extends React.PureComponent { // eslint-disable-line react/prefer-stateless-function
  constructor(props) {
    super(props);
    this.state = {
      practitionerId: 1961,
      isPatientModalOpen: false,
    };
    this.cancelTask = this.cancelTask.bind(this);
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

  cancelTask(logicalId) {
    this.props.cancelTask(logicalId);
  }

  render() {
    const { tasks: { loading, data }, patient, user } = this.props;
    const addNewItem = {
      labelName: <FormattedMessage {...messages.buttonLabelCreateNew} />,
      linkUrl: MANAGE_TASK_URL,
    };
    const patientName = mapToPatientName(patient);
    return (
      <Card>
        <PanelToolbar
          addNewItem={addNewItem}
          showNewItem={user.role !== PATIENT_ROLE_VALUE}
        />
        {isEmpty(patientName) ?
          <h4><FormattedMessage {...messages.patientNotSelected} /></h4> :
          <InfoSection>
            <InlineLabel htmlFor={this.PATIENT_NAME_HTML_ID}>
              <FormattedMessage {...messages.labelPatientName} />&nbsp;
            </InlineLabel>
            <span id={this.PATIENT_NAME_HTML_ID}>{patientName}</span>
          </InfoSection>
        }

        {loading &&
        <RefreshIndicatorLoading />}

        {!loading && !isEmpty(patientName) && !isEmpty(patient.id) && isEmpty(data) &&
        <NoResultsFoundText>
          <FormattedMessage {...messages.noTasksFound} />
        </NoResultsFoundText>}

        {!isEmpty(data) &&
        <div>
          <CenterAlign>
            <TaskTable
              elements={data}
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
  user: PropTypes.shape({
    role: PropTypes.string.isRequired,
  }).isRequired,
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
