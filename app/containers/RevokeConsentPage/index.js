/**
 *
 * RevokeConsentPage
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
import makeSelectRevokeConsentPage from './selectors';
import reducer from './reducer';
import saga from './saga';
import messages from './messages';

export class RevokeConsentPage extends React.Component { // eslint-disable-line react/prefer-stateless-function
  render() {
    return (
      <div>
        <Helmet>
          <title>RevokeConsentPage</title>
          <meta name="description" content="Revoke Consent" />
        </Helmet>
        <FormattedMessage {...messages.header} />
      </div>
    );
  }
}

RevokeConsentPage.propTypes = {
  dispatch: PropTypes.func.isRequired,
};

const mapStateToProps = createStructuredSelector({
  revokeconsentpage: makeSelectRevokeConsentPage(),
});

function mapDispatchToProps(dispatch) {
  return {
    dispatch,
  };
}

const withConnect = connect(mapStateToProps, mapDispatchToProps);

const withReducer = injectReducer({ key: 'revokeConsentPage', reducer });
const withSaga = injectSaga({ key: 'revokeConsentPage', saga });

export default compose(
  withReducer,
  withSaga,
  withConnect,
)(RevokeConsentPage);
