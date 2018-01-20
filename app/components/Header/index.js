/**
 * Header
 */
import React from 'react';
import { Link } from 'react-router-dom';
import { Toolbar, ToolbarGroup, ToolbarSeparator } from 'material-ui/Toolbar';
import FlatButton from 'material-ui/FlatButton';
import FontIcon from 'material-ui/FontIcon';
import IconButton from 'material-ui/IconButton';
import styles from './styles.css';
import LogoutButton from '../LogoutButton/index';

function Header() {
  return (
    <Toolbar className={styles.toolbar}>
      <ToolbarGroup firstChild>
        <FlatButton
          label="Home"
          icon={<FontIcon className={styles.homeIcon} />}
          containerElement={<Link to="/home" />}
          className={styles.font}
        />
        <FlatButton
          label="Patients"
          icon={<FontIcon className={styles.addressBookIcon} />}
          containerElement={<Link to="/patients" />}
          className={styles.font}
        />
      </ToolbarGroup>
      <ToolbarGroup lastChild>
        <ToolbarSeparator />
        <IconButton
          tooltip="Help"
          iconClassName={styles.questionCircleIcon}
        />
        <LogoutButton />
      </ToolbarGroup>
    </Toolbar>
  );
}

Header.propTypes = {};

export default Header;
