/**
 * LogoutButton
 */

import React from 'react';
import { compose } from 'redux';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import IconButton from 'material-ui/IconButton';
import ActionLogout from 'material-ui/svg-icons/action/exit-to-app';

import injectSaga from 'utils/injectSaga';
import { requestLogout } from '../../containers/LoginPage/actions';
import saga from '../../containers/LoginPage/saga';

function LogoutButton(props) {
  return (
    <IconButton
      tooltip="Sign out"
      onClick={props.onRequestLogout}
    >
      <ActionLogout />
    </IconButton>
  );
}

LogoutButton.propTypes = {
  onRequestLogout: PropTypes.func.isRequired,
};

function mapDispatchToProps(dispatch) {
  return {
    onRequestLogout: () => dispatch(requestLogout()),
  };
}

const withConnect = connect(null, mapDispatchToProps);
const withSaga = injectSaga({ key: 'loginPage', saga });

export default compose(
  withSaga,
  withConnect,
)(LogoutButton);
