/**
 *
 * PatientPage
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
import makeSelectPatientPage from './selectors';
import reducer from './reducer';
import saga from './saga';
import messages from './messages';

export class PatientPage extends React.PureComponent { // eslint-disable-line react/prefer-stateless-function
  render() {
    return (
      <div>
        <Helmet>
          <title>Patient</title>
          <meta name="description" content="Patient page of Omnibus Care Plan application" />
        </Helmet>
        <FormattedMessage {...messages.header} />
      </div>
    );
  }
}

PatientPage.propTypes = {
  dispatch: PropTypes.func.isRequired,
};

const mapStateToProps = createStructuredSelector({
  patientpage: makeSelectPatientPage(),
});

function mapDispatchToProps(dispatch) {
  return {
    dispatch,
  };
}

const withConnect = connect(mapStateToProps, mapDispatchToProps);

const withReducer = injectReducer({ key: 'patientPage', reducer });
const withSaga = injectSaga({ key: 'patientPage', saga });

export default compose(
  withReducer,
  withSaga,
  withConnect,
)(PatientPage);
