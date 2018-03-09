/**
 *
 * UpcomingTasks
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
import makeSelectUpcomingTasks from './selectors';
import reducer from './reducer';
import saga from './saga';
import messages from './messages';

export class UpcomingTasks extends React.PureComponent { // eslint-disable-line react/prefer-stateless-function
  render() {
    return (
      <div>
        <Helmet>
          <title>UpcomingTasks</title>
          <meta name="description" content="Description of UpcomingTasks" />
        </Helmet>
        <FormattedMessage {...messages.header} />
      </div>
    );
  }
}

UpcomingTasks.propTypes = {
  dispatch: PropTypes.func.isRequired,
};

const mapStateToProps = createStructuredSelector({
  upcomingtasks: makeSelectUpcomingTasks(),
});

function mapDispatchToProps(dispatch) {
  return {
    dispatch,
  };
}

const withConnect = connect(mapStateToProps, mapDispatchToProps);

const withReducer = injectReducer({ key: 'upcomingTasks', reducer });
const withSaga = injectSaga({ key: 'upcomingTasks', saga });

export default compose(
  withReducer,
  withSaga,
  withConnect,
)(UpcomingTasks);
