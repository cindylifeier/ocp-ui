/**
 *
 * UpcomingTasksPage
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
import makeSelectUpcomingTasksPage from './selectors';
import reducer from './reducer';
import saga from './saga';
import messages from './messages';

export class UpcomingTasksPage extends React.PureComponent { // eslint-disable-line react/prefer-stateless-function
  render() {
    return (
      <div>
        <Helmet>
          <title>UpcomingTasksPage</title>
          <meta name="description" content="Description of UpcomingTasksPage" />
        </Helmet>
        <FormattedMessage {...messages.header} />
      </div>
    );
  }
}

UpcomingTasksPage.propTypes = {
  dispatch: PropTypes.func.isRequired,
};

const mapStateToProps = createStructuredSelector({
  upcomingtaskspage: makeSelectUpcomingTasksPage(),
});

function mapDispatchToProps(dispatch) {
  return {
    dispatch,
  };
}

const withConnect = connect(mapStateToProps, mapDispatchToProps);

const withReducer = injectReducer({ key: 'upcomingTasksPage', reducer });
const withSaga = injectSaga({ key: 'upcomingTasksPage', saga });

export default compose(
  withReducer,
  withSaga,
  withConnect,
)(UpcomingTasksPage);
