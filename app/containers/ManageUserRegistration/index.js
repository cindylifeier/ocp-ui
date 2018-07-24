/**
 *
 * ManageUserRegistration
 *
 */

import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { createStructuredSelector } from 'reselect';
import { compose } from 'redux';

import injectSaga from 'utils/injectSaga';
import injectReducer from 'utils/injectReducer';
import makeSelectManageUserRegistration from './selectors';
import reducer from './reducer';
import saga from './saga';

export class ManageUserRegistration extends React.Component { // eslint-disable-line react/prefer-stateless-function
  render() {
    return (
      <div>
        Manage User Registration
      </div>
    );
  }
}

ManageUserRegistration.propTypes = {
  dispatch: PropTypes.func.isRequired,
};

const mapStateToProps = createStructuredSelector({
  manageuserregistration: makeSelectManageUserRegistration(),
});

function mapDispatchToProps(dispatch) {
  return {
    dispatch,
  };
}

const withConnect = connect(mapStateToProps, mapDispatchToProps);

const withReducer = injectReducer({ key: 'manageUserRegistration', reducer });
const withSaga = injectSaga({ key: 'manageUserRegistration', saga });

export default compose(
  withReducer,
  withSaga,
  withConnect,
)(ManageUserRegistration);
