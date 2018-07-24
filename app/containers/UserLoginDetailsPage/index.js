/**
 *
 * UserLoginDetailsPage
 *
 */

import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { Helmet } from 'react-helmet';
import { FormattedMessage } from 'react-intl';
import { compose } from 'redux';

import PublicHeader from 'components/PublicHeader';
import messages from './messages';

export class UserLoginDetailsPage extends React.Component { // eslint-disable-line react/prefer-stateless-function
  render() {
    return (
      <div>
        <Helmet>
          <title>Sample User Login Details</title>
          <meta name="description" content="Sample User Login Details page of Omnibus Care Plan application" />
        </Helmet>
        <PublicHeader />
        <FormattedMessage {...messages.header} />
      </div>
    );
  }
}

UserLoginDetailsPage.propTypes = {
  dispatch: PropTypes.func.isRequired,
};


function mapDispatchToProps(dispatch) {
  return {
    dispatch,
  };
}

const withConnect = connect(null, mapDispatchToProps);

export default compose(
  withConnect,
)(UserLoginDetailsPage);
