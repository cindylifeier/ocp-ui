/**
 *
 * ManageUsersPage
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
import makeSelectManageUsersPage from './selectors';
import reducer from './reducer';
import saga from './saga';

export class ManageUsersPage extends React.Component { // eslint-disable-line react/prefer-stateless-function
  render() {
    return (
      <div>
        <Helmet>
          <title>ManageUsersPage</title>
          <meta name="description" content="Description of ManageUsersPage" />
        </Helmet>
        <div>
          Mange Users Page Test
        </div>
      </div>
    );
  }
}

ManageUsersPage.propTypes = {
  dispatch: PropTypes.func.isRequired,
};

const mapStateToProps = createStructuredSelector({
  manageuserspage: makeSelectManageUsersPage(),
});

function mapDispatchToProps(dispatch) {
  return {
    dispatch,
  };
}

const withConnect = connect(mapStateToProps, mapDispatchToProps);

const withReducer = injectReducer({ key: 'manageUsersPage', reducer });
const withSaga = injectSaga({ key: 'manageUsersPage', saga });

export default compose(
  withReducer,
  withSaga,
  withConnect,
)(ManageUsersPage);
