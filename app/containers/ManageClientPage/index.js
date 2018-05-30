/**
 *
 * ManageClientPage
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
import makeSelectManageClientPage from './selectors';
import reducer from './reducer';
import saga from './saga';
import messages from './messages';

export class ManageClientPage extends React.Component { // eslint-disable-line react/prefer-stateless-function
  render() {
    return (
      <div>
        <Helmet>
          <title>ManageClientPage</title>
          <meta name="description" content="Description of ManageClientPage" />
        </Helmet>
        <FormattedMessage {...messages.header} />
      </div>
    );
  }
}

ManageClientPage.propTypes = {
  dispatch: PropTypes.func.isRequired,
};

const mapStateToProps = createStructuredSelector({
  manageclientpage: makeSelectManageClientPage(),
});

function mapDispatchToProps(dispatch) {
  return {
    dispatch,
  };
}

const withConnect = connect(mapStateToProps, mapDispatchToProps);

const withReducer = injectReducer({ key: 'manageClientPage', reducer });
const withSaga = injectSaga({ key: 'manageClientPage', saga });

export default compose(
  withReducer,
  withSaga,
  withConnect,
)(ManageClientPage);
