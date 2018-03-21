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
import isEmpty from 'lodash/isEmpty';

import injectSaga from 'utils/injectSaga';
import injectReducer from 'utils/injectReducer';
import Card from 'components/Card';
import CardHeader from 'components/CardHeader';
import UpcomingTasksTable from 'components/UpcomingTasksTable';
import CenterAlign from 'components/Align/CenterAlign';
import NoResultsFoundText from 'components/NoResultsFoundText';
import RefreshIndicatorLoading from 'components/RefreshIndicatorLoading';
import ConfirmPatientModal from 'components/ConfirmPatientModal';
import { getUpcomingTasks, initializeUpcomingTasks } from 'containers/UpcomingTasks/actions';
import { makeSelectPatient } from 'containers/App/contextSelectors';
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
      isPatientModalOpen: false,
    };
    this.handlePatientViewDetailsClick = this.handlePatientViewDetailsClick.bind(this);
    this.handlePatientModalClose = this.handlePatientModalClose.bind(this);
  }

  componentDidMount() {
    this.props.initializeUpcomingTasks();
    this.props.getUpcomingTasks(this.state.practitionerId);
  }

  handlePatientViewDetailsClick() {
    this.setState({ isPatientModalOpen: true });
  }

  handlePatientModalOpen() {
    this.setState({ isPatientModalOpen: true });
  }

  handlePatientModalClose() {
    this.setState({ isPatientModalOpen: false });
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
        {!isEmpty(data) && !isEmpty(data) &&
        <div>
          <CenterAlign>
            <UpcomingTasksTable
              elements={data}
              loginPractitonerId={practitionerId}
              onPatientViewDetailsClick={this.handlePatientViewDetailsClick}
            />
          </CenterAlign>
        </div>
        }
        {this.props.patient &&
        <ConfirmPatientModal
          patient={this.props.patient}
          isPatientModalOpen={this.state.isPatientModalOpen}
          onPatientModalClose={this.handlePatientModalClose}
        />}
      </Card>
    );
  }
}

UpcomingTasks.propTypes = {
  loading: PropTypes.bool,
  data: PropTypes.array,
  practitionerId: PropTypes.string,
  initializeUpcomingTasks: PropTypes.func.isRequired,
  getUpcomingTasks: PropTypes.func.isRequired,
  patient: PropTypes.shape({
    id: PropTypes.string,
    name: PropTypes.array,
  }),
};

const mapStateToProps = createStructuredSelector({
  loading: makeSelectUpcomingTasksLoading(),
  data: makeSelectUpcomingTasks(),
  patient: makeSelectPatient(),
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
