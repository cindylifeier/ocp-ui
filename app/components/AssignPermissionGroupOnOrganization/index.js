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
import teal from 'material-ui-next/colors/teal';

import StyledAddCircleIcon from 'components/StyledAddCircleIcon';
import StyledFlatButton from 'components/StyledFlatButton';
import StyledDialog from 'components/StyledDialog';
import AssignPermissionGroupsForm from './AssignPermissionGroupsForm';
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
    const { user, groups, resourceType, assignedPermissionGroups, errors } = this.props;
    const assignPermissionGroupsFormProps = {
      groups,
      user,
      resourceType,
    };
    const assignedGroupsTableProps = {
      assignedPermissionGroups,
      errors,
    };
    console.log(assignedGroupsTableProps);
    return (
      <div>
        <StyledFlatButton color="primary" fontWeight="bold" fontSize="15px" onClick={this.handleOpenDialog}>
          <StyledAddCircleIcon color={teal['500']} />
          <FormattedMessage {...messages.assignPermissionGroupButton} />
        </StyledFlatButton>
        <FieldArray
          name="permissionGroups"
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
  assignedPermissionGroups: PropTypes.arrayOf(PropTypes.shape({
    organizationReference: PropTypes.object,
    groupId: PropTypes.string,
  })),
  errors: PropTypes.object,
};

export default AssignPermissionGroupOnOrganization;
