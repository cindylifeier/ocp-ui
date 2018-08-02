/**
 *
 * AssignPermissionGroupOnOrganization
 *
 */

import React from 'react';
import PropTypes from 'prop-types';
import { FormattedMessage } from 'react-intl';
import { FieldArray } from 'formik';
import { DialogContent, DialogTitle } from 'material-ui-next/Dialog';

import StyledRaisedButton from 'components/StyledRaisedButton';
import StyledDialog from 'components/StyledDialog';
import AssignPermissionGroupsForm from './AssignPermissionGroupsForm';
import AssignedPermissionGroupsTable from './AssignedPermissionGroupsTable';
import messages from './messages';


class AssignPermissionGroupOnOrganization extends React.Component { // eslint-disable-line react/prefer-stateless-function
  constructor(props) {
    super(props);
    this.state = {
      dialogOpen: false,
      editingPermissionGroup: null,
    };
    this.handleOpenDialog = this.handleOpenDialog.bind(this);
    this.handleCloseDialog = this.handleCloseDialog.bind(this);
    this.handleEditPermissionGroup = this.handleEditPermissionGroup.bind(this);
  }

  handleOpenDialog() {
    this.setState({ dialogOpen: true });
  }

  handleCloseDialog() {
    this.setState({
      dialogOpen: false,
      editingPermissionGroup: null,
    });
  }

  handleEditPermissionGroup(index, permissionGroup) {
    this.setState((prevState) => ({
      dialogOpen: !prevState.dialogOpen,
      editingPermissionGroup: { index, permissionGroup },
    }));
  }

  render() {
    const { user, groups, resourceType, roles, errors } = this.props;
    const PATIENT_TYPE = 'Patient';
    const organizations = resourceType === PATIENT_TYPE ? [].concat(user.organization) :
      user.practitionerRoles && user.practitionerRoles.map((practitioner) => practitioner.organization);
    const assignPermissionGroupsFormProps = {
      groups,
      organizations,
    };
    const assignedPermissionGroupsTableProps = {
      roles,
      errors,
    };

    return (
      <div>
        <StyledRaisedButton color="primary" fontWeight="bold" fontSize="15px" onClick={this.handleOpenDialog}>
          <FormattedMessage {...messages.assignPermissionGroupButton} />
        </StyledRaisedButton>
        <FieldArray
          name="roles"
          render={(arrayHelpers) => (
            <div>
              <StyledDialog open={this.state.dialogOpen} fullWidth>
                <DialogTitle>
                  <FormattedMessage {...messages.dialogTitle} />
                </DialogTitle>
                <DialogContent>
                  <AssignPermissionGroupsForm
                    initialValues={this.state.editingPermissionGroup}
                    onAssignPermissionGroup={arrayHelpers.push}
                    onRemovePermissionGroup={arrayHelpers.remove}
                    onCloseDialog={this.handleCloseDialog}
                    {...assignPermissionGroupsFormProps}
                  />
                </DialogContent>
              </StyledDialog>
              {roles &&
              <AssignedPermissionGroupsTable
                arrayHelpers={arrayHelpers}
                onEditPermissionGroup={this.handleEditPermissionGroup}
                {...assignedPermissionGroupsTableProps}
              />
              }
            </div>
          )}
        />
      </div>
    );
  }
}

AssignPermissionGroupOnOrganization.propTypes = {
  user: PropTypes.object.isRequired,
  resourceType: PropTypes.string.isRequired,
  groups: PropTypes.arrayOf(PropTypes.shape({
    id: PropTypes.string.isRequired,
    displayName: PropTypes.string.isRequired,
    description: PropTypes.string,
    scopes: PropTypes.array.isRequired,
  })).isRequired,
  roles: PropTypes.arrayOf(PropTypes.shape({
    orgId: PropTypes.string,
    role: PropTypes.string,
  })),
  errors: PropTypes.object,
};

export default AssignPermissionGroupOnOrganization;
