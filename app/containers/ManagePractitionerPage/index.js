/**
 *
 * ManagePractitionerPage
 *
 */

import React from 'react';
import { connect } from 'react-redux';
import { Helmet } from 'react-helmet';
import { FormattedMessage } from 'react-intl';
import { createStructuredSelector } from 'reselect';
import { compose } from 'redux';

import injectSaga from 'utils/injectSaga';
import injectReducer from 'utils/injectReducer';
import makeSelectManagePractitionerPage from './selectors';
import reducer from './reducer';
import saga from './saga';
import messages from './messages';

export class ManagePractitionerPage extends React.PureComponent { // eslint-disable-line react/prefer-stateless-function
  render() {
    return (
      <div>
        <Helmet>
          <title>Manage Practitioner</title>
          <meta name="description" content="Manage practitioner page of Omnibus Care Plan application" />
        </Helmet>
        <FormattedMessage {...messages.header} />
      </div>
    );
  }
}

ManagePractitionerPage.propTypes = {};

const mapStateToProps = createStructuredSelector({
  managepractitionerpage: makeSelectManagePractitionerPage(),
});

function mapDispatchToProps(dispatch) {
  return {
    dispatch,
  };
}

const withConnect = connect(mapStateToProps, mapDispatchToProps);

const withReducer = injectReducer({ key: 'managePractitionerPage', reducer });
const withSaga = injectSaga({ key: 'managePractitionerPage', saga });

export default compose(
  withReducer,
  withSaga,
  withConnect,
)(ManagePractitionerPage);
