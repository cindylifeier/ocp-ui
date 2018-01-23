/**
 * Header
 */
import React from 'react';
import { Link } from 'react-router-dom';
import { Toolbar, ToolbarGroup, ToolbarSeparator } from 'material-ui/Toolbar';
import FlatButton from 'material-ui/FlatButton';
import IconButton from 'material-ui/IconButton';
import ActionHome from 'material-ui/svg-icons/action/home';
import ActionPatients from 'material-ui/svg-icons/action/perm-contact-calendar';
import ActionHelp from 'material-ui/svg-icons/action/help';
import styles from './styles.css';
import LogoutButton from '../LogoutButton/index';

function Header() {
  return (
    <Toolbar className={styles.toolbar}>
      <ToolbarGroup firstChild>
        <span className={styles.iconButton}>
          <FlatButton
            label="Home"
            icon={<ActionHome />}
            containerElement={<Link to="/home" />}
            className={styles.font}
          />
        </span>
        <span className={styles.iconButton}>
          <FlatButton
            label="Patients"
            icon={<ActionPatients />}
            containerElement={<Link to="/home" />}
            className={styles.font}
          />
        </span>
      </ToolbarGroup>
      <ToolbarGroup lastChild>
        <ToolbarSeparator />
        <span className={styles.iconButton}>
          <IconButton tooltip="Help">
            <ActionHelp />
          </IconButton>
        </span>
        <span className={styles.iconButton}>
          <LogoutButton />
        </span>
      </ToolbarGroup>
    </Toolbar>
  );
}

Header.propTypes = {};

export default Header;
