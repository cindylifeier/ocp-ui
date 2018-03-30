/**
 *
 * PractitionerAppointments
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
import makeSelectPractitionerAppointments from './selectors';
import reducer from './reducer';
import saga from './saga';
import messages from './messages';

export class PractitionerAppointments extends React.Component { // eslint-disable-line react/prefer-stateless-function
  render() {
    return (
      <div>
        <Helmet>
          <title>PractitionerAppointments</title>
          <meta name="description" content="Description of PractitionerAppointments" />
        </Helmet>
        <FormattedMessage {...messages.header} />
      </div>
    );
  }
}

PractitionerAppointments.propTypes = {
  dispatch: PropTypes.func.isRequired,
};

const mapStateToProps = createStructuredSelector({
  practitionerappointments: makeSelectPractitionerAppointments(),
});

function mapDispatchToProps(dispatch) {
  return {
    dispatch,
  };
}

const withConnect = connect(mapStateToProps, mapDispatchToProps);

const withReducer = injectReducer({ key: 'practitionerAppointments', reducer });
const withSaga = injectSaga({ key: 'practitionerAppointments', saga });

export default compose(
  withReducer,
  withSaga,
  withConnect,
)(PractitionerAppointments);
