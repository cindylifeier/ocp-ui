/**
 *
 * AppointmentsCalendar
 *
 */

import Calendar from 'components/Calendar';
import { getLookupsAction } from 'containers/App/actions';

import { APPOINTMENT_STATUS, APPOINTMENT_TYPE, MANAGE_APPOINTMENT_URL } from 'containers/App/constants';
import { getPatient, refreshPatient } from 'containers/App/contextActions';
import isEmpty from 'lodash/isEmpty';
import PropTypes from 'prop-types';
import React from 'react';
import { connect } from 'react-redux';
import { withRouter } from 'react-router-dom';
import { compose } from 'redux';
import { createStructuredSelector } from 'reselect';
import injectReducer from 'utils/injectReducer';
import injectSaga from 'utils/injectSaga';
import { getAppointments, getOutlookAppointments } from './actions';
import reducer from './reducer';
import saga from './saga';
import makeSelectAppointmentsCalendar from './selectors';

export class AppointmentsCalendar extends React.Component { // eslint-disable-line react/prefer-stateless-function
  constructor(props) {
    super(props);
    this.navigateToEditAppointment = this.navigateToEditAppointment.bind(this);
  }

  componentDidMount() {
    this.props.getAppointments();
    this.props.getOutlookAppointments();
  }

  navigateToEditAppointment(appointment, patientId) {
    if (appointment.isOutlookAppointment) {
      // alert('Cannot edit this Outlook Appointment');
    } else {
      // alert('Navigating');
      this.props.getPatient(patientId);
      this.props.history.push(appointment.editUrl);
    }
  }

  render() {
    const { appointmentsCalendar: { data, outlookData } } = this.props;
    return (
      <div>
        {!isEmpty(data) &&
        <Calendar
          elements={data}
          outlookElements={outlookData}
          manageAppointmentUrl={MANAGE_APPOINTMENT_URL}
          navigateToEditAppointment={this.navigateToEditAppointment}
        />
        }
      </div>
    );
  }
}

AppointmentsCalendar.propTypes = {
  getAppointments: PropTypes.func.isRequired,
  getOutlookAppointments: PropTypes.func.isRequired,
  appointmentsCalendar: PropTypes.shape({
    data: PropTypes.array,
    outlookData: PropTypes.array,
  }),
  history: PropTypes.object.isRequired,
  getPatient: PropTypes.func.isRequired,
};

const mapStateToProps = createStructuredSelector({
  appointmentsCalendar: makeSelectAppointmentsCalendar(),
});

function mapDispatchToProps(dispatch) {
  return {
    getAppointments: (query) => dispatch(getAppointments(query)),
    getOutlookAppointments: () => dispatch(getOutlookAppointments()),
    getLookupData: () => dispatch(getLookupsAction([APPOINTMENT_STATUS, APPOINTMENT_TYPE])),
    refreshPatient: () => dispatch(refreshPatient()),
    getPatient: (logicalId) => dispatch(getPatient(logicalId)),
  };
}

const withConnect = connect(mapStateToProps, mapDispatchToProps);
const withReducer = injectReducer({ key: 'appointmentsCalendar', reducer });
const withSaga = injectSaga({ key: 'appointmentsCalendar', saga });

const reduxCompose = compose(
  withReducer,
  withSaga,
  withConnect,
)(AppointmentsCalendar);

export default withRouter(reduxCompose);
