/**
 *
 * PrivateHeader
 *
 */

import React from 'react';
import { FormattedMessage } from 'react-intl';
import PropTypes from 'prop-types';
import { ToolbarGroup } from 'material-ui/Toolbar';
import AccountBox from '@material-ui/icons/AccountBox';
import Notifications from '@material-ui/icons/Notifications';
import FlatButton from 'material-ui/FlatButton';
import Menu, { MenuItem } from 'material-ui-next/Menu';

import ChangePassword from 'containers/ChangePassword';
import Logout from 'containers/Logout';
import StyledImage from 'components/StyledImage';
import StyledToolbar from 'components/StyledToolbar';
import brandImg from 'images/omnibus-care-plan-logo.png';
import messages from './messages';


class PrivateHeader extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      anchorEl: null,
      openDrawer: false,
    };
    this.handleClick = this.handleClick.bind(this);
    this.handleClose = this.handleClose.bind(this);
    this.handleDrawerOpen = this.handleDrawerOpen.bind(this);
    this.handleDrawerClose = this.handleDrawerClose.bind(this);
  }

  getUserProfileName() {
    return this.props.user && (this.props.user.name ? this.props.user.name : this.props.user.user_name);
  }

  handleClick(event) {
    this.setState({ anchorEl: event.currentTarget });
  }

  handleClose() {
    this.setState({ anchorEl: null });
  }

  handleDrawerOpen() {
    this.setState({ openDrawer: true });
  }

  handleDrawerClose() {
    this.setState({ openDrawer: false });
  }

  render() {
    const { anchorEl, openDrawer } = this.state;
    return (
      <StyledToolbar
        color="#ffffff"
        height="35px"
      >
        <ToolbarGroup firstChild>
          <StyledImage height="30px" width="40px" src={brandImg} alt={<FormattedMessage {...messages.brandImg} />} />
        </ToolbarGroup>
        <ToolbarGroup lastChild>
          <Notifications viewBox="-2 -2 25 25" />
          <FlatButton
            label={this.getUserProfileName()}
            icon={<AccountBox />}
            onClick={this.handleClick}
          />
        </ToolbarGroup>
        <Menu
          anchorEl={anchorEl}
          open={Boolean(anchorEl)}
          onClose={this.handleClose}
        >
          <MenuItem
            onClick={() => {
              this.handleClose();
              this.handleDrawerOpen();
            }}
          >
            <FormattedMessage {...messages.changePasswordMenuItem} />
          </MenuItem>
          <Logout />
        </Menu>
        <ChangePassword drawerOpen={openDrawer} onCloseDrawer={this.handleDrawerClose} />
      </StyledToolbar>
    );
  }
}

PrivateHeader.propTypes = {
  user: PropTypes.shape({
    user_name: PropTypes.string,
    user_id: PropTypes.string,
    email: PropTypes.string,
    name: PropTypes.string,
  }),
};

export default PrivateHeader;
