/**
 *
 * PermissionsGroups
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
import makeSelectPermissionsGroups from './selectors';
import reducer from './reducer';
import saga from './saga';

export class PermissionsGroups extends React.Component { // eslint-disable-line react/prefer-stateless-function
  render() {
    return (
      <div>
        <Helmet>
          <title>PermissionsGroups</title>
          <meta name="description" content="Description of PermissionsGroups" />
        </Helmet>
        <test>Permiison groups component</test>
      </div>
    );
  }
}

PermissionsGroups.propTypes = {
  dispatch: PropTypes.func.isRequired,
};

const mapStateToProps = createStructuredSelector({
  permissionsgroups: makeSelectPermissionsGroups(),
});

function mapDispatchToProps(dispatch) {
  return {
    dispatch,
  };
}

const withConnect = connect(mapStateToProps, mapDispatchToProps);

const withReducer = injectReducer({ key: 'permissionsGroups', reducer });
const withSaga = injectSaga({ key: 'permissionsGroups', saga });

export default compose(
  withReducer,
  withSaga,
  withConnect,
)(PermissionsGroups);
