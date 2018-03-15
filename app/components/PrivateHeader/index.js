/**
 *
 * PrivateHeader
 *
 */

import React from 'react';
import { FormattedMessage } from 'react-intl';
import PropTypes from 'prop-types';
import { ToolbarGroup } from 'material-ui/Toolbar';
import AccountBox from 'material-ui/svg-icons/action/account-box';
import FlatButton from 'material-ui/FlatButton';
import Popover from 'material-ui/Popover';
import Menu from 'material-ui/Menu';

import Logout from 'containers/Logout';
import StyledBrandImage from 'components/StyledBrandImage';
import brandImg from 'images/omnibus-care-plan-logo.png';
import PrivateHeaderToolbar from './PrivateHeaderToolbar';
import messages from './messages';


class PrivateHeader extends React.PureComponent {
  constructor(props) {
    super(props);
    this.state = {
      isOpen: false,
    };
    this.handleClick = this.handleClick.bind(this);
    this.handleRequestClose = this.handleRequestClose.bind(this);
  }

  getUserProfileName() {
    return this.props.context.user.name ? this.props.context.user.name : this.props.context.user.user_name;
  }

  handleClick(event) {
    event.preventDefault();
    this.setState({
      isOpen: true,
      anchorEl: event.currentTarget,
    });
  }

  handleRequestClose() {
    this.setState({ isOpen: false });
  }

  render() {
    return (
      <PrivateHeaderToolbar>
        <ToolbarGroup firstChild>
          <StyledBrandImage src={brandImg} alt={<FormattedMessage {...messages.brandImg} />} />
        </ToolbarGroup>
        <ToolbarGroup lastChild>
          <FlatButton
            label={this.getUserProfileName()}
            icon={<AccountBox />}
            onClick={this.handleClick}
          />
        </ToolbarGroup>
        <Popover
          open={this.state.isOpen}
          anchorEl={this.state.anchorEl}
          anchorOrigin={{ horizontal: 'left', vertical: 'bottom' }}
          targetOrigin={{ horizontal: 'left', vertical: 'top' }}
          onRequestClose={this.handleRequestClose}
        >
          <Menu>
            <Logout />
          </Menu>
        </Popover>
      </PrivateHeaderToolbar>
    );
  }
}

PrivateHeader.propTypes = {
  context: PropTypes.shape({
    user: PropTypes.shape({
      user_name: PropTypes.string,
      user_id: PropTypes.string,
      email: PropTypes.string,
      name: PropTypes.string,
    }),
  }).isRequired,
};

export default PrivateHeader;
