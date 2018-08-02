/*
 * AssignPermissionGroupOnOrganization Messages
 *
 * This contains all the text for the AssignPermissionGroupOnOrganization component.
 */
import { defineMessages } from 'react-intl';

export default defineMessages({
  assignPermissionGroupButton: {
    id: 'ocpui.components.AssignPermissionGroupOnOrganization.assignPermissionGroupButton',
    defaultMessage: 'Assign Permission Group',
  },
  dialogTitle: {
    id: 'ocpui.components.AssignPermissionGroupOnOrganization.dialogTitle',
    defaultMessage: 'Assign Permission Group',
  },
  assignGroupsForm: {
    validation: {
      required: {
        id: 'ocpui.components.AssignPermissionGroupsForm.validation.required',
        defaultMessage: 'Required',
      },
    },
    hintText: {
      organization: {
        id: 'ocpui.components.AssignPermissionGroupsForm.hintText.organization',
        defaultMessage: 'Organization',
      },
      permissionGroup: {
        id: 'ocpui.components.AssignPermissionGroupsForm.hintText.permissionGroup',
        defaultMessage: 'Permission Group',
      },
    },
    floatingLabelText: {
      organization: {
        id: 'ocpui.components.AssignPermissionGroupsForm.floatingLabelText.organization',
        defaultMessage: 'Organization',
      },
      permissionGroup: {
        id: 'ocpui.components.AssignPermissionGroupsForm.floatingLabelText.permissionGroup',
        defaultMessage: 'Permission Group',
      },
    },
    saveButton: {
      id: 'ocpui.components.AssignPermissionGroupsForm.saveButton',
      defaultMessage: 'Save',
    },
    cancelButton: {
      id: 'ocpui.components.AssignPermissionGroupsForm.cancelButton',
      defaultMessage: 'Cancel',
    },
  },
});
