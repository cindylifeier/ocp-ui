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
  CARE_COORDINATOR,
  CARE_COORDINATOR_URL,
  CARE_MANAGER,
  HOME_URL,
  OCP_ADMIN,
  PATIENT,
  PATIENTS_URL,
  PCP,
  WORKSPACE_SELECTION_URL,
} from 'containers/App/constants';
import StyledToolbar from 'components/StyledToolbar';
import messages from './messages';

function PrivateNavigation(props) {
  const role = props.context.role;

  // TODO: Will configure link urls
  function getLinkTo() {
    let linkTo;
    switch (role) {
      case OCP_ADMIN:
        linkTo = HOME_URL;
        break;
      case CARE_MANAGER:
        linkTo = PATIENTS_URL;
        break;
      case CARE_COORDINATOR:
        linkTo = CARE_COORDINATOR_URL;
        break;
      case PATIENT:
        linkTo = CARE_COORDINATOR_URL;
        break;
      case PCP:
        linkTo = CARE_COORDINATOR_URL;
        break;
      default:
        linkTo = WORKSPACE_SELECTION_URL;
    }
    return linkTo;
  }

  return (
    <StyledToolbar>
      <ToolbarGroup firstChild>
        <FlatButton
          label={<FormattedMessage {...messages.navButton} />}
          icon={<ActionHome />}
          primary
          containerElement={<Link to={getLinkTo()} />}
        />
      </ToolbarGroup>
    </StyledToolbar>
  );
}

PrivateNavigation.propTypes = {
  context: PropTypes.shape({
    role: PropTypes.string.isRequired,
  }).isRequired,
};

export default PrivateNavigation;
