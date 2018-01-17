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
          icon={<FontIcon className="fa fa-home" />}
          containerElement={<Link to="/home" />}
        />
        <FlatButton
          label="Patients"
          icon={<FontIcon className="fa fa-address-book" />}
          containerElement={<Link to="/patients" />}
        />
      </ToolbarGroup>
      <ToolbarGroup lastChild>
        <ToolbarSeparator />
        <IconButton
          tooltip="Help"
          iconClassName="fa fa-question-circle"
        />
        <LogoutButton />
      </ToolbarGroup>
    </Toolbar>
  );
}

Header.propTypes = {};

export default Header;
