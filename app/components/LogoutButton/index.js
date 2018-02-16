/**
 * LogoutButton
 */

import React from 'react';
import PropTypes from 'prop-types';
import IconButton from 'material-ui/IconButton';
import withRouter from 'react-router-dom/es/withRouter';
import ActionLogout from 'material-ui/svg-icons/action/exit-to-app';
import { LOGIN_URL } from '../../containers/App/constants';
import { removeToken } from '../../utils/tokenService';

function LogoutButton(props) {
  return (
    <IconButton
      tooltip="Sign out"
      onClick={() => {
        props.history.push(LOGIN_URL);
        removeToken();
      }}
    >
      <ActionLogout />
    </IconButton>
  );
}

LogoutButton.propTypes = {
  history: PropTypes.object,
};

export default withRouter(LogoutButton);
