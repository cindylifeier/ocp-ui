/**
*
* Header
*
*/

import React from 'react';


// import { FormattedMessage } from 'react-intl';
// import messages from './messages';

import { Link } from 'react-router-dom';
import { Toolbar, ToolbarGroup, ToolbarSeparator } from 'material-ui/Toolbar';
import FlatButton from 'material-ui/FlatButton';
import FontIcon from 'material-ui/FontIcon';
import IconButton from 'material-ui/IconButton';
import { DropDownMenu } from 'material-ui';
import styles from './Header.css';
import LogoutButton from '../LogoutButton/index';

class Header extends React.Component { // eslint-disable-line react/prefer-stateless-function
  render() {
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

          <DropDownMenu
            value
            onChange={this.handleChange}
          >
          </DropDownMenu>
          <ToolbarSeparator />
          <IconButton
            tooltip="Help"
            iconClassName="fa fa-question-circle"
          />
          <LogoutButton></LogoutButton>
        </ToolbarGroup>
      </Toolbar>
    );
  }
}

Header.propTypes = {

};

export default Header;
