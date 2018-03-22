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

import RecordsRange from 'components/RecordsRange';
import injectSaga from 'utils/injectSaga';
import injectReducer from 'utils/injectReducer';
import { mapToPatientName } from 'utils/PatientUtils';
import RefreshIndicatorLoading from 'components/RefreshIndicatorLoading';
import TaskTable from 'components/TaskTable';
import Card from 'components/Card';
import CardHeader from 'components/CardHeader';
import InfoSection from 'components/InfoSection';
import InlineLabel from 'components/InlineLabel';
import NoResultsFoundText from 'components/NoResultsFoundText';
import CenterAlignedUltimatePagination from 'components/CenterAlignedUltimatePagination';
import CenterAlign from 'components/Align/CenterAlign';
import { DEFAULT_START_PAGE_NUMBER, MANAGE_COMMUNICATION_URL, MANAGE_TASK_URL } from 'containers/App/constants';
import { makeSelectPatient } from 'containers/App/contextSelectors';
import makeSelectTasks from './selectors';
import reducer from './reducer';
import saga from './saga';
import messages from './messages';
import { cancelTask, getTasks, initializeTasks } from './actions';

export class Tasks extends React.PureComponent { // eslint-disable-line react/prefer-stateless-function
  constructor(props) {
    super(props);
    this.handlePageClick = this.handlePageClick.bind(this);
    this.cancelTask = this.cancelTask.bind(this);
    this.PATIENT_NAME_HTML_ID = uniqueId('patient_name_');
  }

  componentDidMount() {
    this.props.initializeTasks();
    const { patient } = this.props;
    if (patient) {
      this.props.getTasks(DEFAULT_START_PAGE_NUMBER);
    }
  }

  componentWillReceiveProps(nextProps) {
    const { patient } = this.props;
    const { patient: newPatient } = nextProps;
    if (!isEqual(patient, newPatient)) {
      this.props.getTasks(DEFAULT_START_PAGE_NUMBER);
    }
  }

  handlePageClick(page) {
    this.props.getTasks(page);
  }

  cancelTask(logicalId) {
    this.props.cancelTask(logicalId);
  }

  render() {
    const { tasks: { loading, data }, patient } = this.props;
    const patientName = mapToPatientName(patient);
    const communicationBaseUrl = MANAGE_COMMUNICATION_URL;
    const taskBaseUrl = MANAGE_TASK_URL;
    return (
      <Card>
        <CardHeader title={<FormattedMessage {...messages.header} />} />
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

        {!isEmpty(data) && !isEmpty(data.elements) &&
        <div>
          <CenterAlign>
            <TaskTable
              elements={data.elements}
              cancelTask={this.cancelTask}
              patientId={patient.id}
              communicationBaseUrl={communicationBaseUrl}
              taskBaseUrl={taskBaseUrl}
            />
          </CenterAlign>
          <CenterAlignedUltimatePagination
            currentPage={data.currentPage}
            totalPages={data.totalNumberOfPages}
            onChange={this.handlePageClick}
          />
          <RecordsRange
            currentPage={data.currentPage}
            totalPages={data.totalNumberOfPages}
            totalElements={data.totalElements}
            currentPageSize={data.currentPageSize}
          />
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
});

function mapDispatchToProps(dispatch) {
  return {
    getTasks: (pageNumber) => dispatch(getTasks(pageNumber)),
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
