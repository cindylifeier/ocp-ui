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


export class UpcomingAppointments extends React.PureComponent { // eslint-disable-line react/prefer-stateless-function
  constructor(props) {
    super(props);
    this.handlePageClick = this.handlePageClick.bind(this);
  }
  componentDidMount() {
    this.props.getUpcomingAppointments();
  }
  handlePageClick(page) {
    this.props.getUpcomingAppointments({ pageNumber: page });
  }
  render() {
    const { upcomingAppointments: { loading, data } } = this.props;
    return (
      <div>
        <Card>
          {loading &&
          <RefreshIndicatorLoading />}
          {!loading && isEmpty(data) &&
          <NoUpcomingAppointments>No Upcoming Appointments.</NoUpcomingAppointments>}
          {!isEmpty(data) && !isEmpty(data.elements) &&
          <CenterAlign>
            <CareCoordinatorUpcomingAppointmentTable elements={data.elements} />
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
  upcomingAppointments: PropTypes.shape({
    loading: PropTypes.bool.isRequired,
    data: PropTypes.shape({
      elements: PropTypes.array,
    }),
  }).isRequired,
};

const mapStateToProps = createStructuredSelector({
  upcomingAppointments: makeSelectUpcomingAppointments(),
});

function mapDispatchToProps(dispatch) {
  return {
    getUpcomingAppointments: () => dispatch(getUpcomingAppointments()),
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
