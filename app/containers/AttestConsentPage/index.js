/**
 *
 * AttestConsentPage
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
import makeSelectAttestConsentPage from './selectors';
import reducer from './reducer';
import saga from './saga';
import messages from './messages';

export class AttestConsentPage extends React.Component { // eslint-disable-line react/prefer-stateless-function
  render() {
    return (
      <div>
        <Helmet>
          <title>AttestConsentPage</title>
          <meta name="description" content="Sign consent" />
        </Helmet>
        <FormattedMessage {...messages.header} />
      </div>
    );
  }
}

AttestConsentPage.propTypes = {
  dispatch: PropTypes.func.isRequired,
};

const mapStateToProps = createStructuredSelector({
  attestconsentpage: makeSelectAttestConsentPage(),
});

function mapDispatchToProps(dispatch) {
  return {
    dispatch,
  };
}

const withConnect = connect(mapStateToProps, mapDispatchToProps);

const withReducer = injectReducer({ key: 'attestConsentPage', reducer });
const withSaga = injectSaga({ key: 'attestConsentPage', saga });

export default compose(
  withReducer,
  withSaga,
  withConnect,
)(AttestConsentPage);
