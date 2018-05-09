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

import injectSaga from 'utils/injectSaga';
import injectReducer from 'utils/injectReducer';
import makeSelectAppointmentsCalendar from './selectors';
import reducer from './reducer';
import saga from './saga';

export class AppointmentsCalendar extends React.Component { // eslint-disable-line react/prefer-stateless-function
  render() {
    return (
      <div>
        <Helmet>
          <title>AppointmentsCalendar</title>
          <meta name="description" content="Description of AppointmentsCalendar" />
        </Helmet>
      </div>
    );
  }
}

AppointmentsCalendar.propTypes = {
  dispatch: PropTypes.func.isRequired,
};

const mapStateToProps = createStructuredSelector({
  appointmentscalendar: makeSelectAppointmentsCalendar(),
});

function mapDispatchToProps(dispatch) {
  return {
    dispatch,
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
