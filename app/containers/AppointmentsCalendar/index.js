/**
 *
 * AppointmentsCalendar
 *
 */

import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { Helmet } from 'react-helmet';
import { createStructuredSelector } from 'reselect';
import { compose } from 'redux';

import { makeSelectAppointmentStatuses, makeSelectAppointmentTypes } from 'containers/App/lookupSelectors';
import { APPOINTMENT_STATUS, APPOINTMENT_TYPE } from 'containers/App/constants';
import { getLookupsAction } from 'containers/App/actions';

import injectSaga from 'utils/injectSaga';
import injectReducer from 'utils/injectReducer';
import makeSelectAppointmentsCalendar from './selectors';
import { getAppointments } from './actions';
import reducer from './reducer';
import saga from './saga';

export class AppointmentsCalendar extends React.Component { // eslint-disable-line react/prefer-stateless-function
  componentDidMount() {
    this.props.getAppointments();
    this.props.getLookupData();
  }

  render() {
    return (
      <div>
        <Helmet>
          <title>AppointmentsCalendar</title>
          <meta name="description" content="Description of AppointmentsCalendar" />
        </Helmet>
        AppointmentsCalendar
      </div>
    );
  }
}

AppointmentsCalendar.propTypes = {
  getAppointments: PropTypes.func.isRequired,
  getLookupData: PropTypes.func.isRequired,
};

const mapStateToProps = createStructuredSelector({
  appointmentsCalendar: makeSelectAppointmentsCalendar(),
  appointmentTypes: makeSelectAppointmentTypes(),
  appointmentStatuses: makeSelectAppointmentStatuses(),
});

function mapDispatchToProps(dispatch) {
  return {
    getAppointments: (query) => dispatch(getAppointments(query)),
    getLookupData: () => dispatch(getLookupsAction([APPOINTMENT_STATUS, APPOINTMENT_TYPE])),
  };
}

const withConnect = connect(mapStateToProps, mapDispatchToProps);

const withReducer = injectReducer({ key: 'appointmentsCalendar', reducer });
const withSaga = injectSaga({ key: 'appointmentsCalendar', saga });

export default compose(
  withReducer,
  withSaga,
  withConnect,
)(AppointmentsCalendar);
