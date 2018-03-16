/**
 *
 * PatientWorkspacePage
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
import makeSelectPatientWorkspacePage from './selectors';
import reducer from './reducer';
import saga from './saga';
import messages from './messages';

export class PatientWorkspacePage extends React.PureComponent { // eslint-disable-line react/prefer-stateless-function
  render() {
    return (
      <div>
        <Helmet>
          <title>Patient Workspace</title>
          <meta name="description" content="Patient workspace page of Omnibus Care Plan application" />
        </Helmet>
        <FormattedMessage {...messages.header} />
      </div>
    );
  }
}

PatientWorkspacePage.propTypes = {
  dispatch: PropTypes.func.isRequired,
};

const mapStateToProps = createStructuredSelector({
  patientworkspacepage: makeSelectPatientWorkspacePage(),
});

function mapDispatchToProps(dispatch) {
  return {
    dispatch,
  };
}

const withConnect = connect(mapStateToProps, mapDispatchToProps);

const withReducer = injectReducer({ key: 'patientWorkspacePage', reducer });
const withSaga = injectSaga({ key: 'patientWorkspacePage', saga });

export default compose(
  withReducer,
  withSaga,
  withConnect,
)(PatientWorkspacePage);
