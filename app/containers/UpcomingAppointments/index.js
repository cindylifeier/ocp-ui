/**
 *
 * UpcomingAppointments
 *
 */

import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { createStructuredSelector } from 'reselect';
import { compose } from 'redux';
import { getLookupsAction } from 'containers/App/actions';
import { makeSelectAppointmentTypes, makeSelectAppointmentStatuses } from 'containers/App/lookupSelectors';
import isEmpty from 'lodash/isEmpty';
import Card from 'components/Card/index';
import NoUpcomingAppointments from 'containers/UpcomingAppointments/NoUpcomingAppointments';
import CareCoordinatorUpcomingAppointmentTable from 'components/CareCoordinatorUpcomingAppointmentTable/index';
import { getUpcomingAppointments } from 'containers/UpcomingAppointments/actions';
import RefreshIndicatorLoading from 'components/RefreshIndicatorLoading/index';
import CenterAlignedUltimatePagination from 'components/CenterAlignedUltimatePagination/index';
import CenterAlign from 'components/Align/CenterAlign';
import injectSaga from 'utils/injectSaga';
import injectReducer from 'utils/injectReducer';
import makeSelectUpcomingAppointments from './selectors';
import reducer from './reducer';
import saga from './saga';
import { APPOINTMENT_STATUS, APPOINTMENT_TYPE } from '../App/constants';

export class UpcomingAppointments extends React.PureComponent { // eslint-disable-line react/prefer-stateless-function
  constructor(props) {
    super(props);
    this.handlePageClick = this.handlePageClick.bind(this);
  }
  componentDidMount() {
    this.props.getUpcomingAppointments();
    this.props.getLookupData();
  }
  handlePageClick(page) {
    this.props.getUpcomingAppointments({ pageNumber: page });
  }
  render() {
    const { upcomingAppointments: { loading, data }, appointmentTypes, appointmentStatuses } = this.props;
    return (
      <div>
        <Card>
          {loading &&
          <RefreshIndicatorLoading />}
          {!loading && isEmpty(data) &&
          <NoUpcomingAppointments>No Upcoming Appointments.</NoUpcomingAppointments>}
          { !isEmpty(data) && !isEmpty(data.elements) &&
          <CenterAlign>
            <CareCoordinatorUpcomingAppointmentTable elements={data.elements} appointmentStatuses={appointmentStatuses} appointmentTypes={appointmentTypes} />
            <CenterAlignedUltimatePagination
              currentPage={data.currentPage}
              totalPages={data.totalNumberOfPages}
              onChange={this.handlePageClick}
            />
          </CenterAlign>
          }
        </Card>
      </div>
    );
  }
}

UpcomingAppointments.propTypes = {
  getUpcomingAppointments: PropTypes.func.isRequired,
  getLookupData: PropTypes.func.isRequired,
  appointmentTypes: PropTypes.array,
  appointmentStatuses: PropTypes.array,
  upcomingAppointments: PropTypes.shape({
    loading: PropTypes.bool.isRequired,
    data: PropTypes.shape({
      elements: PropTypes.array,
    }),
  }).isRequired,
};

const mapStateToProps = createStructuredSelector({
  upcomingAppointments: makeSelectUpcomingAppointments(),
  appointmentTypes: makeSelectAppointmentTypes(),
  appointmentStatuses: makeSelectAppointmentStatuses(),
});

function mapDispatchToProps(dispatch) {
  return {
    getUpcomingAppointments: () => dispatch(getUpcomingAppointments()),
    getLookupData: () => dispatch(getLookupsAction([APPOINTMENT_STATUS, APPOINTMENT_TYPE])),
  };
}

const withConnect = connect(mapStateToProps, mapDispatchToProps);

const withReducer = injectReducer({ key: 'upcomingAppointments', reducer });
const withSaga = injectSaga({ key: 'upcomingAppointments', saga });

export default compose(
  withReducer,
  withSaga,
  withConnect,
)(UpcomingAppointments);
