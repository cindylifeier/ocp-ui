/**
 *
 * UserAccountsPage
 *
 */

import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { Helmet } from 'react-helmet';
import { createStructuredSelector } from 'reselect';
import { compose } from 'redux';

import injectSaga from 'utils/injectSaga';
import injectReducer from 'utils/injectReducer';
import UserAccounts from 'components/UserAccounts';
import makeSelectUserAccountsPage from './selectors';
import reducer from './reducer';
import saga from './saga';

export class UserAccountsPage extends React.Component { // eslint-disable-line react/prefer-stateless-function
  render() {
    return (
      <div>
        <Helmet>
          <title>Test User Accounts</title>
          <meta name="description" content="Test User Accounts page of Omnibus Care Plan application" />
        </Helmet>
        <UserAccounts />
      </div>
    );
  }
}

UserAccountsPage.propTypes = {
  dispatch: PropTypes.func.isRequired,
};

const mapStateToProps = createStructuredSelector({
  useraccountspage: makeSelectUserAccountsPage(),
});

function mapDispatchToProps(dispatch) {
  return {
    dispatch,
  };
}

const withConnect = connect(mapStateToProps, mapDispatchToProps);

const withReducer = injectReducer({ key: 'userAccountsPage', reducer });
const withSaga = injectSaga({ key: 'userAccountsPage', saga });

export default compose(
  withReducer,
  withSaga,
  withConnect,
)(UserAccountsPage);
