/**
 *
 * AdminManagePermissionsPage
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
import makeSelectAdminManagePermissionsPage from './selectors';
import reducer from './reducer';
import saga from './saga';

export class AdminManagePermissionsPage extends React.Component { // eslint-disable-line react/prefer-stateless-function
  render() {
    return (
      <div>
        <Helmet>
          <title>AdminManagePermissionsPage</title>
          <meta name="description" content="Description of AdminManagePermissionsPage" />
        </Helmet>
        <div>
          Manage Permissions Page Test
        </div>
      </div>
    );
  }
}

AdminManagePermissionsPage.propTypes = {
  dispatch: PropTypes.func.isRequired,
};

const mapStateToProps = createStructuredSelector({
  adminmanagepermissionspage: makeSelectAdminManagePermissionsPage(),
});

function mapDispatchToProps(dispatch) {
  return {
    dispatch,
  };
}

const withConnect = connect(mapStateToProps, mapDispatchToProps);

const withReducer = injectReducer({ key: 'adminManagePermissionsPage', reducer });
const withSaga = injectSaga({ key: 'adminManagePermissionsPage', saga });

export default compose(
  withReducer,
  withSaga,
  withConnect,
)(AdminManagePermissionsPage);
