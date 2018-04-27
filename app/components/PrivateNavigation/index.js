/**
 *
 * PrivateNavigation
 *
 */

import React from 'react';
import { Link } from 'react-router-dom';
import PropTypes from 'prop-types';
import { FormattedMessage } from 'react-intl';
import { ToolbarGroup } from 'material-ui/Toolbar';
import ActionHome from '@material-ui/icons/Home';
import StyledToolbar from 'components/StyledToolbar';
import StyledIconButton from 'components/StyledIconButton';
import messages from './messages';
import NavigationButton from './NavigationButton';

function PrivateNavigation(props) {
  const role = props.user.role;
  return (
    <StyledToolbar height="30px">
      <ToolbarGroup firstChild>
        <NavigationButton component={Link} to={props.getLinkUrlByRole(role)}>
          <StyledIconButton size="x-small" svgIconSize="small" disableIconHover>
            <ActionHome color="#9cc" />
          </StyledIconButton>
          {<FormattedMessage {...messages.navButton} />}
        </NavigationButton>
      </ToolbarGroup>
    </StyledToolbar>
  );
}

PrivateNavigation.propTypes = {
  user: PropTypes.shape({
    role: PropTypes.string.isRequired,
  }).isRequired,
  getLinkUrlByRole: PropTypes.func.isRequired,
};

export default PrivateNavigation;
