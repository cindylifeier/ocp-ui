/**
 * LogoutButton
 */

import React from 'react';
import PropTypes from 'prop-types';
import IconButton from 'material-ui/IconButton';
import withRouter from 'react-router-dom/es/withRouter';
import styles from './styles.css';

function LogoutButton(props) {
  return (
    <IconButton
      tooltip="Sign out"
      iconClassName={styles.logoutIcon}
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
