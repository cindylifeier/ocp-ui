/**
 *
 * SearchAppointmentParticipant
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
import makeSelectSearchAppointmentParticipant from './selectors';
import reducer from './reducer';
import saga from './saga';
import messages from './messages';

export class SearchAppointmentParticipant extends React.PureComponent { // eslint-disable-line react/prefer-stateless-function
  render() {
    return (
      <div>
        <Helmet>
          <title>SearchAppointmentParticipant</title>
          <meta name="description" content="Description of SearchAppointmentParticipant" />
        </Helmet>
        <FormattedMessage {...messages.header} />
      </div>
    );
  }
}

SearchAppointmentParticipant.propTypes = {
  dispatch: PropTypes.func.isRequired,
};

const mapStateToProps = createStructuredSelector({
  searchappointmentparticipant: makeSelectSearchAppointmentParticipant(),
});

function mapDispatchToProps(dispatch) {
  return {
    dispatch,
  };
}

const withConnect = connect(mapStateToProps, mapDispatchToProps);

const withReducer = injectReducer({ key: 'searchAppointmentParticipant', reducer });
const withSaga = injectSaga({ key: 'searchAppointmentParticipant', saga });

export default compose(
  withReducer,
  withSaga,
  withConnect,
)(SearchAppointmentParticipant);
