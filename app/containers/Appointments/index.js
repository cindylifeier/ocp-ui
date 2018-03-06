/**
 *
 * Appointments
 *
 */

import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { Helmet } from 'react-helmet';
import { FormattedMessage } from 'react-intl';
import { createStructuredSelector } from 'reselect';
import { compose } from 'redux';

import injectSaga from 'utils/injectSaga';
import injectReducer from 'utils/injectReducer';
import makeSelectAppointments from './selectors';
import reducer from './reducer';
import saga from './saga';
import messages from './messages';

export class Appointments extends React.PureComponent { // eslint-disable-line react/prefer-stateless-function
  render() {
    return (
      <div>
        <Helmet>
          <title>Appointments</title>
          <meta name="description" content="Description of Appointments" />
        </Helmet>
        <FormattedMessage {...messages.header} />
      </div>
    );
  }
}

Appointments.propTypes = {
  dispatch: PropTypes.func.isRequired,
};

const mapStateToProps = createStructuredSelector({
  appointments: makeSelectAppointments(),
});

function mapDispatchToProps(dispatch) {
  return {
    dispatch,
  };
}

const withConnect = connect(mapStateToProps, mapDispatchToProps);

const withReducer = injectReducer({ key: 'appointments', reducer });
const withSaga = injectSaga({ key: 'appointments', saga });

export default compose(
  withReducer,
  withSaga,
  withConnect,
)(Appointments);
