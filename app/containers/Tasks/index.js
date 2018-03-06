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
import UltimatePagination from 'react-ultimate-pagination-material-ui';

import injectSaga from 'utils/injectSaga';
import injectReducer from 'utils/injectReducer';
import RefreshIndicatorLoading from '../../components/RefreshIndicatorLoading';
import makeSelectTasks from './selectors';
import reducer from './reducer';
import saga from './saga';
import messages from './messages';
import styles from './styles.css';
import { cancelTask, getTasks, initializeTasks } from './actions';
import TaskTable from '../../components/TaskTable';

export class Tasks extends React.PureComponent { // eslint-disable-line react/prefer-stateless-function

  constructor(props) {
    super(props);
    this.handlePageClick = this.handlePageClick.bind(this);
    this.cancelTask = this.cancelTask.bind(this);
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
    return (
      <div className={styles.card}>
        <div className={styles.header}>
          <FormattedMessage {...messages.header} />
        </div>
        {isEmpty(patientName) ?
          <h4><FormattedMessage {...messages.patientNotSelected} /></h4> :
          <div className={styles.gridContainer}>
            <div className={styles.patientInfoSection}>
              <div className={styles.patientLabel}>
                Patient&nbsp;:&nbsp;
              </div>
              {patientName}
            </div>
          </div>
        }

        {loading &&
        <RefreshIndicatorLoading />}

        {!loading && !isEmpty(patientName) && !isEmpty(patientId) && isEmpty(data) &&
        <div className={styles.noTask}>
          <FormattedMessage {...messages.noTasksFound} />
        </div>}

        {!isEmpty(data) && !isEmpty(data.elements) &&
        <div className={styles.textCenter}>
          <TaskTable elements={data.elements} cancelTask={this.cancelTask} selectedPatientId={patientId} />
          <UltimatePagination
            currentPage={data.currentPage}
            totalPages={data.totalNumberOfPages}
            boundaryPagesRange={1}
            siblingPagesRange={1}
            hidePreviousAndNextPageLinks={false}
            hideFirstAndLastPageLinks={false}
            hideEllipsis={false}
            onChange={this.handlePageClick}
          />
        </div>
        }
      </div>
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
