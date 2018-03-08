/**
 *
 * CareCoordinatorPage
 *
 */

import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { Helmet } from 'react-helmet';
import { FormattedMessage } from 'react-intl';
import { compose } from 'redux';

import messages from './messages';

export class CareCoordinatorPage extends React.PureComponent { // eslint-disable-line react/prefer-stateless-function
  render() {
    return (
      <div>
        <Helmet>
          <title>CareCoordinatorPage</title>
          <meta name="description" content="Description of CareCoordinatorPage" />
        </Helmet>
        <FormattedMessage {...messages.header} />
      </div>
    );
  }
}

CareCoordinatorPage.propTypes = {
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
)(CareCoordinatorPage);
