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
import FlatButton from 'material-ui/FlatButton';
import ActionHome from 'material-ui/svg-icons/action/home';
import StyledToolbar from 'components/StyledToolbar';
import messages from './messages';

function PrivateNavigation(props) {
  const role = props.user.role;
  return (
    <StyledToolbar>
      <ToolbarGroup firstChild>
        <FlatButton
          label={<FormattedMessage {...messages.navButton} />}
          icon={<ActionHome />}
          primary
          containerElement={<Link to={props.onGetNavigateToLinkUrlByRole(role)} />}
        />
      </ToolbarGroup>
    </StyledToolbar>
  );
}

PrivateNavigation.propTypes = {
  user: PropTypes.shape({
    role: PropTypes.string.isRequired,
  }).isRequired,
  onGetNavigateToLinkUrlByRole: PropTypes.func.isRequired,
};

export default PrivateNavigation;
