/**
 *
 * C2SPrivateHeader
 *
 */

import React from 'react';
import PropTypes from 'prop-types';
import { FormattedMessage } from 'react-intl';
import { ToolbarGroup, ToolbarSeparator, ToolbarTitle } from 'material-ui/Toolbar';
import common from 'material-ui-next/colors/common';

import GoBackButton from 'components/GoBackButton';
import UserAvatar from 'components/UserAvatar';
import StyledToolbar from 'components/StyledToolbar';
import StyledImage from 'components/StyledImage';
import c2sBrandImg from 'images/c2s-logo.png';
import messages from './messages';


class C2SPrivateHeader extends React.Component { // eslint-disable-line react/prefer-stateless-function
  render() {
    const { user } = this.props;
    return (
      <StyledToolbar color={common.white} height="60px">
        <ToolbarGroup>
          <UserAvatar />
          <ToolbarTitle text={user.user_name} />
        </ToolbarGroup>
        <ToolbarGroup>
          <StyledImage height="35px" width="35px" src={c2sBrandImg} alt={<FormattedMessage {...messages.brandImg} />} />
          <ToolbarSeparator />
          <GoBackButton label={<FormattedMessage {...messages.homeButton} />} />
        </ToolbarGroup>
      </StyledToolbar>
    );
  }
}

C2SPrivateHeader.propTypes = {
  user: PropTypes.shape({
    user_name: PropTypes.string,
  }).isRequired,
};

export default C2SPrivateHeader;
