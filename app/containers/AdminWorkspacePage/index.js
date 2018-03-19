/**
 *
 * AdminWorkspacePage
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
import makeSelectAdminWorkspacePage from './selectors';
import reducer from './reducer';
import saga from './saga';
import messages from './messages';

export class AdminWorkspacePage extends React.PureComponent { // eslint-disable-line react/prefer-stateless-function
  render() {
    return (
      <div>
        <Helmet>
          <title>Admin Workspace</title>
          <meta name="description" content="Admin workspace page of Omnibus Care Plan application" />
        </Helmet>
        <FormattedMessage {...messages.header} />
      </div>
    );
  }
}

AdminWorkspacePage.propTypes = {
  dispatch: PropTypes.func.isRequired,
};

const mapStateToProps = createStructuredSelector({
  adminworkspacepage: makeSelectAdminWorkspacePage(),
});

function mapDispatchToProps(dispatch) {
  return {
    dispatch,
  };
}

const withConnect = connect(mapStateToProps, mapDispatchToProps);

const withReducer = injectReducer({ key: 'adminWorkspacePage', reducer });
const withSaga = injectSaga({ key: 'adminWorkspacePage', saga });

export default compose(
  withReducer,
  withSaga,
  withConnect,
)(AdminWorkspacePage);
