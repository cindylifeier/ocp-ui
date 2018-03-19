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

import {
  ADMIN_WORKSPACE,
  CARE_COORDINATOR,
  CARE_MANAGER,
  OCP_ADMIN,
  PATIENT,
  PATIENT_WORKSPACE,
  PRACTITIONER_WORKSPACE,
  WORKSPACE_SELECTION_URL,
} from 'containers/App/constants';
import StyledToolbar from 'components/StyledToolbar';
import messages from './messages';

function PrivateNavigation(props) {
  const role = props.context.role;
  return (
    <StyledToolbar>
      <ToolbarGroup firstChild>
        <FlatButton
          label={<FormattedMessage {...messages.navButton} />}
          icon={<ActionHome />}
          primary
          containerElement={<Link to={getLinkUrlByRole(role)} />}
        />
      </ToolbarGroup>
    </StyledToolbar>
  );
}

export function getLinkUrlByRole(role) {
  let linkUrl;
  switch (role) {
    case OCP_ADMIN:
      linkUrl = ADMIN_WORKSPACE;
      break;
    case CARE_MANAGER:
      linkUrl = PRACTITIONER_WORKSPACE;
      break;
    case CARE_COORDINATOR:
      linkUrl = PRACTITIONER_WORKSPACE;
      break;
    case PATIENT:
      linkUrl = PATIENT_WORKSPACE;
      break;
    default:
      linkUrl = WORKSPACE_SELECTION_URL;
  }
  return linkUrl;
}

PrivateNavigation.propTypes = {
  context: PropTypes.shape({
    role: PropTypes.string.isRequired,
  }).isRequired,
};

export default PrivateNavigation;
