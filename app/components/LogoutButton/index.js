/**
 * LogoutButton
 */

import React from 'react';
import PropTypes from 'prop-types';
import IconButton from 'material-ui/IconButton';
import withRouter from 'react-router-dom/es/withRouter';
import ActionLogout from 'material-ui/svg-icons/action/exit-to-app';

function LogoutButton(props) {
  return (
    <IconButton
      tooltip="Sign out"
      onClick={() => {
        props.history.push('/ocp-ui/login');
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
