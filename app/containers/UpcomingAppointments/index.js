/**
 *
 * UpcomingAppointments
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
import makeSelectUpcomingAppointments from './selectors';
import reducer from './reducer';
import saga from './saga';

export class UpcomingAppointments extends React.PureComponent { // eslint-disable-line react/prefer-stateless-function
  render() {
    return (
      <div>
        <Helmet>
          <title>UpcomingAppointments</title>
          <meta name="description" content="Description of UpcomingAppointments" />
        </Helmet>
      </div>
    );
  }
}

UpcomingAppointments.propTypes = {
  dispatch: PropTypes.func.isRequired,
};

const mapStateToProps = createStructuredSelector({
  upcomingappointments: makeSelectUpcomingAppointments(),
});

function mapDispatchToProps(dispatch) {
  return {
    dispatch,
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
