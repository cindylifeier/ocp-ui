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
  PATIENT_WORKSPACE,
  PRACTITIONER_WORKSPACE,
  WORKSPACE_SELECTION_URL,
} from 'containers/App/constants';
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
          containerElement={<Link to={getLinkUrlByRole(role)} />}
        />
      </ToolbarGroup>
    </StyledToolbar>
  );
}

// Todo: will refactor this method
export function getLinkUrlByRole(role) {
  const ocpAdminWorkflowRole = {
    value: 'ocpAdminRole',
    display: 'OCP Admin',
  };
  const careManagerWorkflowRole = {
    value: 'careManagerRole',
    display: 'Care Manager',
  };
  const careCoordinatorWorkflowRole = {
    value: 'careCoordinatorRole',
    display: 'Care Coordinator',
  };
  const patientWorkflowRole = {
    value: 'patientRole',
    display: 'Patient',
  };

  let linkUrl;
  switch (role) {
    case ocpAdminWorkflowRole.value:
      linkUrl = ADMIN_WORKSPACE;
      break;
    case careManagerWorkflowRole.value:
      linkUrl = PRACTITIONER_WORKSPACE;
      break;
    case careCoordinatorWorkflowRole.value:
      linkUrl = PRACTITIONER_WORKSPACE;
      break;
    case patientWorkflowRole.value:
      linkUrl = PATIENT_WORKSPACE;
      break;
    default:
      linkUrl = WORKSPACE_SELECTION_URL;
  }
  return linkUrl;
}

PrivateNavigation.propTypes = {
  user: PropTypes.shape({
    role: PropTypes.string.isRequired,
  }).isRequired,
};

export default PrivateNavigation;
