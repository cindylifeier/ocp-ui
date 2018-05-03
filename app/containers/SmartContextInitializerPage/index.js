/**
 *
 * SmartContextInitializerPage
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
import makeSelectSmartContextInitializerPage from './selectors';
import reducer from './reducer';
import saga from './saga';
import messages from './messages';

export class SmartContextInitializerPage extends React.Component { // eslint-disable-line react/prefer-stateless-function
  render() {
    return (
      <div>
        <Helmet>
          <title>SmartContextInitializerPage</title>
          <meta name="description" content="Description of SmartContextInitializerPage" />
        </Helmet>
        <FormattedMessage {...messages.header} />
      </div>
    );
  }
}

SmartContextInitializerPage.propTypes = {
  dispatch: PropTypes.func.isRequired,
};

const mapStateToProps = createStructuredSelector({
  smartcontextinitializerpage: makeSelectSmartContextInitializerPage(),
});

function mapDispatchToProps(dispatch) {
  return {
    dispatch,
  };
}

const withConnect = connect(mapStateToProps, mapDispatchToProps);

const withReducer = injectReducer({ key: 'smartContextInitializerPage', reducer });
const withSaga = injectSaga({ key: 'smartContextInitializerPage', saga });

export default compose(
  withReducer,
  withSaga,
  withConnect,
)(SmartContextInitializerPage);
