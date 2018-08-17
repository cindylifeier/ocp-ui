/**
 *
 * PrivateHeader
 *
 */

import AccountBox from '@material-ui/icons/AccountBox';
import StyledText from 'components/StyledText';

import StyledToolbar from 'components/StyledToolbar';
import {
  BENEFITS_SPECIALIST_ROLE_CODE,
  BENEFITS_SPECIALIST_ROLE_DISPLAY,
  CARE_COORDINATOR_ROLE_CODE,
  CARE_COORDINATOR_ROLE_DISPLAY,
  CARE_MANAGER_ROLE_CODE,
  CARE_MANAGER_ROLE_DISPLAY,
  FRONT_OFFICE_ROLE_CODE,
  FRONT_OFFICE_ROLE_DISPLAY,
  HEALTH_ASSISTANT_ROLE_CODE,
  HEALTH_ASSISTANT_ROLE_DISPLAY,
  OCP_ADMIN_ROLE_CODE,
  OCP_ADMIN_ROLE_DISPLAY,
  ORGANIZATION_ADMIN_ROLE_CODE,
  ORGANIZATION_ADMIN_ROLE_DISPLAY,
  PATIENT_ROLE_CODE,
  PATIENT_ROLE_DISPLAY,
  PCP_ROLE_CODE,
  PCP_ROLE_DISPLAY,
} from 'containers/App/constants';
import ChangePassword from 'containers/ChangePassword';
import Logout from 'containers/Logout';
import isUndefined from 'lodash/isUndefined';
import Menu, { MenuItem } from 'material-ui-next/Menu';
import FlatButton from 'material-ui/FlatButton';
import { ToolbarGroup } from 'material-ui/Toolbar';
import PropTypes from 'prop-types';
import React from 'react';
import { FormattedMessage } from 'react-intl';
import { Grid } from 'styled-css-grid';
import * as PatientUtils from 'utils/PatientUtils';


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
    let name;
    if (this.props.user) {
      if (this.props.user.name) {
        name = this.props.user.name;
      } else if (this.props.user.fhirResource) {
        name = PatientUtils.mapToPatientName(this.props.user.fhirResource);
      } else {
        name = this.props.user.user_name;
      }
    }
    return name;
  }

  getUserRole() {
    return this.props.user && this.props.user.role;
  }

  getUserOrganizationName() {
    let orgId;
    if (this.props.user && this.props.user.ext_attr && this.props.user.ext_attr.orgId) {
      orgId = this.props.user.ext_attr.orgId;
      const organizationReference = `Organization/${orgId}`;
      if (this.props.user && this.props.user.fhirResource && this.props.user.fhirResource.practitionerRoles) {
        return this.props.user.fhirResource.practitionerRoles
          .filter((pracRole) => pracRole.organization.reference === organizationReference)
          .map((pracRole) => pracRole.organization.display)
          .join(', ');
      }
    }
    return null;
  }

  mapRoleCodeToRoleName() {
    const roleCode = this.getUserRole();
    if (!isUndefined(roleCode) && roleCode !== null) {
      switch (roleCode) {
        case OCP_ADMIN_ROLE_CODE:
          return OCP_ADMIN_ROLE_DISPLAY;
        case PATIENT_ROLE_CODE:
          return PATIENT_ROLE_DISPLAY;
        case CARE_COORDINATOR_ROLE_CODE:
          return CARE_COORDINATOR_ROLE_DISPLAY;
        case CARE_MANAGER_ROLE_CODE:
          return CARE_MANAGER_ROLE_DISPLAY;
        case ORGANIZATION_ADMIN_ROLE_CODE:
          return ORGANIZATION_ADMIN_ROLE_DISPLAY;
        case PCP_ROLE_CODE:
          return PCP_ROLE_DISPLAY;
        case BENEFITS_SPECIALIST_ROLE_CODE:
          return BENEFITS_SPECIALIST_ROLE_DISPLAY;
        case HEALTH_ASSISTANT_ROLE_CODE:
          return HEALTH_ASSISTANT_ROLE_DISPLAY;
        case FRONT_OFFICE_ROLE_CODE:
          return FRONT_OFFICE_ROLE_DISPLAY;
        default:
          return null;
      }
    }
    return null;
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
        <ToolbarGroup>
          <Grid columns={1} gap="0px">
            <FlatButton
              style={{ textAlign: 'right' }}
              label={this.getUserProfileName()}
              icon={<AccountBox />}
              onClick={this.handleClick}
            />
            {this.mapRoleCodeToRoleName() &&
            <StyledText textAlign="right">
              Role:
              <StyledText fontWeight={700} whiteSpace>
                {this.mapRoleCodeToRoleName()}
              </StyledText>
            </StyledText>
            }
            {this.getUserOrganizationName() &&
            <StyledText textAlign="right">
              Organization:
              <StyledText fontWeight={700} whiteSpace>
                {this.getUserOrganizationName()}
              </StyledText>
            </StyledText>
            }
            <StyledText></StyledText>
          </Grid>
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
        {openDrawer &&
        <ChangePassword drawerOpen={openDrawer} onCloseDrawer={this.handleDrawerClose} />
        }
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
    role: PropTypes.string,
    fhirResource: PropTypes.object,
    ext_attr: PropTypes.shape({
      orgId: PropTypes.string,
    }),
  }),
};

export default PrivateHeader;
