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

import injectSaga from 'utils/injectSaga';
import injectReducer from 'utils/injectReducer';
import RefreshIndicatorLoading from 'components/RefreshIndicatorLoading';
import TaskTable from 'components/TaskTable';
import Card from 'components/Card';
import CardHeader from 'components/CardHeader';
import InfoSection from 'components/InfoSection';
import InlineLabel from 'components/InlineLabel';
import NoResultsFoundText from 'components/NoResultsFoundText';
import CenterAlignedUltimatePagination from 'components/CenterAlignedUltimatePagination';
import { MANAGE_COMMUNICATION_URL, MANAGE_TASK_URL } from 'containers/App/constants';
import CenterAlign from 'components/Align/CenterAlign';
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
  }

  handlePageClick(page) {
    const { query, patientName, patientId } = this.props.tasks;
    this.props.getTasks({ ...query, pageNumber: page }, patientName, patientId);
  }

  cancelTask(logicalId) {
    this.props.cancelTask(logicalId);
  }

  render() {
    const { tasks: { loading, data, patientName, patientId } } = this.props;
    const commmunicationBaseUrl = MANAGE_COMMUNICATION_URL;
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

        {!loading && !isEmpty(patientName) && !isEmpty(patientId) && isEmpty(data) &&
        <NoResultsFoundText>
          <FormattedMessage {...messages.noTasksFound} />
        </NoResultsFoundText>}

        {!isEmpty(data) && !isEmpty(data.elements) &&
        <div>
          <CenterAlign>
            <TaskTable
              elements={data.elements}
              cancelTask={this.cancelTask}
              selectedPatientId={patientId}
              commmunicationBaseUrl={commmunicationBaseUrl}
              taskBaseUrl={taskBaseUrl}
            />
          </CenterAlign>
          <CenterAlignedUltimatePagination
            currentPage={data.currentPage}
            totalPages={data.totalNumberOfPages}
            onChange={this.handlePageClick}
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
    query: PropTypes.object,
    patientName: PropTypes.string,
    patientId: PropTypes.string,
  }),
};

const mapStateToProps = createStructuredSelector({
  tasks: makeSelectTasks(),
});

function mapDispatchToProps(dispatch) {
  return {
    getTasks: (query, patientName, patientId) => dispatch(getTasks(query, patientName, patientId)),
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
