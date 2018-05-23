/**
 *
 * AppointmentsCalendar
 *
 */

import Calendar from 'components/Calendar';
import DialogHeader from 'components/DialogHeader';
import H3 from 'components/H3';
import StyledFlatButton from 'components/StyledFlatButton';
import { getLookupsAction } from 'containers/App/actions';

import { APPOINTMENT_STATUS, APPOINTMENT_TYPE, MANAGE_APPOINTMENT_URL } from 'containers/App/constants';
import { getPatient, refreshPatient } from 'containers/App/contextActions';
import messages from 'containers/AppointmentsCalendar/messages';
import isEmpty from 'lodash/isEmpty';
import { Dialog } from 'material-ui';
import PropTypes from 'prop-types';
import React from 'react';
import { FormattedMessage } from 'react-intl';
import { connect } from 'react-redux';
import { withRouter } from 'react-router-dom';
import { compose } from 'redux';
import { createStructuredSelector } from 'reselect';
import injectReducer from 'utils/injectReducer';
import injectSaga from 'utils/injectSaga';
import { getAppointments, getOutlookAppointments } from './actions';
import { customContentStyle } from './constants';
import reducer from './reducer';
import saga from './saga';
import makeSelectAppointmentsCalendar from './selectors';

export class AppointmentsCalendar extends React.Component { // eslint-disable-line react/prefer-stateless-function
  constructor(props) {
    super(props);
    this.state = {
      open: false,
    };
    this.handleCloseDialog = this.handleCloseDialog.bind(this);
    this.navigateToEditAppointment = this.navigateToEditAppointment.bind(this);
  }

  componentDidMount() {
    this.props.getAppointments();
    this.props.getOutlookAppointments();
  }

  navigateToEditAppointment(appointment, patientId) {
    if (appointment.isOutlookAppointment) {
      this.setState({ open: true });
    } else {
      this.props.getPatient(patientId);
      this.props.history.push(appointment.editUrl);
    }
  }

  handleCloseDialog() {
    this.setState({ open: false });
  }

  render() {
    const { appointmentsCalendar: { data, outlookData } } = this.props;
    const actions = [
      <StyledFlatButton onClick={this.handleCloseDialog}>
        <FormattedMessage {...messages.dialogButtonLabelOk} />
      </StyledFlatButton>,
    ];
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
        <div>
          <Dialog
            title={<H3><FormattedMessage {...messages.openEvent} /></H3>}
            actions={actions}
            modal
            open={this.state.open}
            onRequestClose={this.handleCloseDialog}
            contentStyle={customContentStyle}
          >
            <DialogHeader>
              <FormattedMessage {...messages.cannotEdit} />
            </DialogHeader>

          </Dialog>
        </div>
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
