/**
 * LogoutButton
 */

import React from 'react';
import PropTypes from 'prop-types';
import IconButton from 'material-ui/IconButton';
import withRouter from 'react-router-dom/es/withRouter';

function LogoutButton(props) {
  return (
    <IconButton
      tooltip="Sign out"
      iconClassName="fa fa-sign-out"
      onClick={() => {
        props.history.push('/login');
      }}
    />
  );
}

LogoutButton.propTypes = {
  history: PropTypes.object,
};

export default withRouter(LogoutButton);
