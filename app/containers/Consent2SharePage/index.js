/**
 *
 * Consent2SharePage
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
import makeSelectConsent2SharePage from './selectors';
import reducer from './reducer';
import saga from './saga';
import messages from './messages';

export class Consent2SharePage extends React.Component { // eslint-disable-line react/prefer-stateless-function
  render() {
    return (
      <div>
        <Helmet>
          <title>Consent2SharePage</title>
          <meta name="description" content="Description of Consent2SharePage" />
        </Helmet>
        <FormattedMessage {...messages.header} />
      </div>
    );
  }
}

Consent2SharePage.propTypes = {
  dispatch: PropTypes.func.isRequired,
};

const mapStateToProps = createStructuredSelector({
  consent2sharepage: makeSelectConsent2SharePage(),
});

function mapDispatchToProps(dispatch) {
  return {
    dispatch,
  };
}

const withConnect = connect(mapStateToProps, mapDispatchToProps);

const withReducer = injectReducer({ key: 'consent2SharePage', reducer });
const withSaga = injectSaga({ key: 'consent2SharePage', saga });

export default compose(
  withReducer,
  withSaga,
  withConnect,
)(Consent2SharePage);
