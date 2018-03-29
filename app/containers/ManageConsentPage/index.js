/**
 *
 * ManageConsentPage
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
import makeSelectManageConsentPage from './selectors';
import reducer from './reducer';
import saga from './saga';
import messages from './messages';

export class ManageConsentPage extends React.Component { // eslint-disable-line react/prefer-stateless-function
  render() {
    return (
      <div>
        <Helmet>
          <title>Manage Consent</title>
          <meta name="description" content="Manage Consent page of Omnibus Care Plan application" />
        </Helmet>
        <FormattedMessage {...messages.createHeader} />
      </div>
    );
  }
}

ManageConsentPage.propTypes = {
  dispatch: PropTypes.func.isRequired,
};

const mapStateToProps = createStructuredSelector({
  manageconsentpage: makeSelectManageConsentPage(),
});

function mapDispatchToProps(dispatch) {
  return {
    dispatch,
  };
}

const withConnect = connect(mapStateToProps, mapDispatchToProps);

const withReducer = injectReducer({ key: 'manageConsentPage', reducer });
const withSaga = injectSaga({ key: 'manageConsentPage', saga });

export default compose(
  withReducer,
  withSaga,
  withConnect,
)(ManageConsentPage);
