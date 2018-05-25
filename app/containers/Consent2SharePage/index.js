/**
 *
 * Consent2SharePage
 *
 */

import React from 'react';
import { connect } from 'react-redux';
import { Helmet } from 'react-helmet';
import { FormattedMessage } from 'react-intl';
import { compose } from 'redux';

import injectSaga from 'utils/injectSaga';
import injectReducer from 'utils/injectReducer';
import Page from 'components/Page';
import reducer from './reducer';
import saga from './saga';
import messages from './messages';

export class Consent2SharePage extends React.Component { // eslint-disable-line react/prefer-stateless-function
  render() {
    return (
      <Page color="secondary">
        <Helmet>
          <title>Consent2Share</title>
          <meta name="description" content="Patient Summary page of Consent2Share Smart On Fhir" />
        </Helmet>
        <FormattedMessage {...messages.header} />
      </Page>
    );
  }
}

Consent2SharePage.propTypes = {};

function mapDispatchToProps(dispatch) {
  return {
    dispatch,
  };
}

const withConnect = connect(null, mapDispatchToProps);

const withReducer = injectReducer({ key: 'consent2SharePage', reducer });
const withSaga = injectSaga({ key: 'consent2SharePage', saga });

export default compose(
  withReducer,
  withSaga,
  withConnect,
)(Consent2SharePage);
