/**
 *
 * UpcomingTasks
 *
 */

import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { FormattedMessage } from 'react-intl';
import { createStructuredSelector } from 'reselect';
import { compose } from 'redux';

import injectSaga from 'utils/injectSaga';
import injectReducer from 'utils/injectReducer';
import Card from 'components/Card';
import CardHeader from 'components/CardHeader';
import isEmpty from 'lodash/isEmpty';
import UpcomingTasksTable from 'components/UpcomingTasksTable';
import CenterAlignedUltimatePagination from 'components/CenterAlignedUltimatePagination';
import CenterAlign from 'components/Align/CenterAlign';
import NoResultsFoundText from 'components/NoResultsFoundText';
import RefreshIndicatorLoading from 'components/RefreshIndicatorLoading';
import { getUpcomingTasks, initializeUpcomingTasks } from 'containers/UpcomingTasks/actions';
import { makeSelectUpcomingTasks, makeSelectUpcomingTasksLoading } from './selectors';
import reducer from './reducer';
import saga from './saga';
import messages from './messages';

export class UpcomingTasks extends React.PureComponent { // eslint-disable-line react/prefer-stateless-function
  constructor(props) {
    super(props);
    this.state = {
      practitionerId: 1961,
      /* practitionerId: 1377,*/
    };
  }
  componentWillMount() {
    this.props.initializeUpcomingTasks();
    this.props.getUpcomingTasks(this.state.practitionerId);
  }

  render() {
    const { loading, data, practitionerId } = this.props;
    return (
      <Card>
        <CardHeader title={<FormattedMessage {...messages.header} />} />
        {loading &&
        <RefreshIndicatorLoading />}

        {!loading && isEmpty(data) &&
        <NoResultsFoundText>
          <FormattedMessage {...messages.noUpcomingTasksFound} />
        </NoResultsFoundText>}
        {!isEmpty(data) && !isEmpty(data.elements) &&
        <div>
          <CenterAlign>
            <UpcomingTasksTable elements={data.elements} loginPractitonerId={practitionerId} />
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

UpcomingTasks.propTypes = {
  loading: PropTypes.bool,
  data: PropTypes.oneOfType([
    PropTypes.array,
    PropTypes.bool,
  ]),
  practitionerId: PropTypes.string,
  initializeUpcomingTasks: PropTypes.func.isRequired,
  getUpcomingTasks: PropTypes.func.isRequired,
};

const mapStateToProps = createStructuredSelector({
  loading: makeSelectUpcomingTasksLoading(),
  data: makeSelectUpcomingTasks(),
});

function mapDispatchToProps(dispatch) {
  return {
    initializeUpcomingTasks: () => dispatch(initializeUpcomingTasks()),
    getUpcomingTasks: (practitionerId) => dispatch(getUpcomingTasks(practitionerId)),
  };
}

const withConnect = connect(mapStateToProps, mapDispatchToProps);

const withReducer = injectReducer({ key: 'upcomingTasks', reducer });
const withSaga = injectSaga({ key: 'upcomingTasks', saga });

export default compose(
  withReducer,
  withSaga,
  withConnect,
)(UpcomingTasks);
