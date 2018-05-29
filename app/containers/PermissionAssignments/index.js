/**
 *
 * PermissionAssignments
 *
 */

import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { createStructuredSelector } from 'reselect';
import { compose } from 'redux';

import injectSaga from 'utils/injectSaga';
import injectReducer from 'utils/injectReducer';
import makeSelectPermissionAssignments from './selectors';
import reducer from './reducer';
import saga from './saga';

export class PermissionAssignments extends React.Component { // eslint-disable-line react/prefer-stateless-function
  render() {
    return (
      <div>
        test
      </div>
    );
  }
}

PermissionAssignments.propTypes = {
  dispatch: PropTypes.func.isRequired,
};

const mapStateToProps = createStructuredSelector({
  permissionassignments: makeSelectPermissionAssignments(),
});

function mapDispatchToProps(dispatch) {
  return {
    dispatch,
  };
}

const withConnect = connect(mapStateToProps, mapDispatchToProps);

const withReducer = injectReducer({ key: 'permissionAssignments', reducer });
const withSaga = injectSaga({ key: 'permissionAssignments', saga });

export default compose(
  withReducer,
  withSaga,
  withConnect,
)(PermissionAssignments);
