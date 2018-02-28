/**
 *
 * ManageCommunicationPage
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
import makeSelectManageCommunicationPage from './selectors';
import reducer from './reducer';
import saga from './saga';
import messages from './messages';

export class ManageCommunicationPage extends React.PureComponent { // eslint-disable-line react/prefer-stateless-function
  render() {
    return (
      <div>
        <Helmet>
          <title>ManageCommunicationPage</title>
          <meta name="description" content="Description of ManageCommunicationPage" />
        </Helmet>
        <FormattedMessage {...messages.header} />
      </div>
    );
  }
}

ManageCommunicationPage.propTypes = {
  dispatch: PropTypes.func.isRequired,
};

const mapStateToProps = createStructuredSelector({
  managecommunicationpage: makeSelectManageCommunicationPage(),
});

function mapDispatchToProps(dispatch) {
  return {
    dispatch,
  };
}

const withConnect = connect(mapStateToProps, mapDispatchToProps);

const withReducer = injectReducer({ key: 'manageCommunicationPage', reducer });
const withSaga = injectSaga({ key: 'manageCommunicationPage', saga });

export default compose(
  withReducer,
  withSaga,
  withConnect,
)(ManageCommunicationPage);
