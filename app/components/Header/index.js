/**
 * Header
 */
import React from 'react';
import { Link } from 'react-router-dom';
import { ToolbarGroup, ToolbarSeparator } from 'material-ui/Toolbar';
import FlatButton from 'material-ui/FlatButton';
import IconButton from 'material-ui/IconButton';
import ActionHome from 'material-ui/svg-icons/action/home';
import ActionPatients from 'material-ui/svg-icons/action/perm-contact-calendar';
import ActionHelp from 'material-ui/svg-icons/action/help';

import StyledToolbar from 'components/StyledToolbar';
import Logout from 'containers/Logout';
import { HOME_URL, PATIENTS_URL } from 'containers/App/constants';
import ToolbarButtonContainer from './ToolbarButtonContainer';

function Header() {
  return (
    <StyledToolbar>
      <ToolbarGroup firstChild>
        <ToolbarButtonContainer>
          <FlatButton
            label="Home"
            icon={<ActionHome />}
            containerElement={<Link to={HOME_URL} />}
          />
        </ToolbarButtonContainer>
        <ToolbarButtonContainer>
          <FlatButton
            label="Patients"
            icon={<ActionPatients />}
            containerElement={<Link to={PATIENTS_URL} />}
          />
        </ToolbarButtonContainer>
      </ToolbarGroup>
      <ToolbarGroup lastChild>
        <ToolbarSeparator />
        <ToolbarButtonContainer>
          <IconButton tooltip="Help">
            <ActionHelp />
          </IconButton>
        </ToolbarButtonContainer>
        <ToolbarButtonContainer>
          <Logout />
        </ToolbarButtonContainer>
      </ToolbarGroup>
    </StyledToolbar>
  );
}

Header.propTypes = {};

export default Header;
