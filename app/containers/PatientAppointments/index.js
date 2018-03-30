/**
 *
 * PatientAppointments
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
import makeSelectPatientAppointments from './selectors';
import reducer from './reducer';
import saga from './saga';
import messages from './messages';

export class PatientAppointments extends React.Component { // eslint-disable-line react/prefer-stateless-function
  render() {
    return (
      <div>
        <Helmet>
          <title>PatientAppointments</title>
          <meta name="description" content="Description of PatientAppointments" />
        </Helmet>
        <FormattedMessage {...messages.header} />
      </div>
    );
  }
}

PatientAppointments.propTypes = {
  dispatch: PropTypes.func.isRequired,
};

const mapStateToProps = createStructuredSelector({
  patientappointments: makeSelectPatientAppointments(),
});

function mapDispatchToProps(dispatch) {
  return {
    dispatch,
  };
}

const withConnect = connect(mapStateToProps, mapDispatchToProps);

const withReducer = injectReducer({ key: 'patientAppointments', reducer });
const withSaga = injectSaga({ key: 'patientAppointments', saga });

export default compose(
  withReducer,
  withSaga,
  withConnect,
)(PatientAppointments);
