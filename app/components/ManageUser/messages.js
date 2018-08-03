/*
 * ManageUser Messages
 *
 * This contains all the text for the ManageUser component.
 */
import { defineMessages } from 'react-intl';

export default defineMessages({
  title: {
    id: 'ocpui.components.ManageUser.manageForm.title',
    defaultMessage: 'General Information for practitioner',
  },
  patientTitle: {
    id: 'ocpui.components.ManageUser.manageForm.patientTitle',
    defaultMessage: 'General Information for patient',
  },
  assignPermissionGroupSubtitle: {
    id: 'ocpui.components.ManageUser.manageForm.assignPermissionGroupSubtitle',
    defaultMessage: 'Assign Permission Group',
  },
  validation: {
    minLength: {
      id: 'ocpui.components.ManageUser.manageForm.validation.minLength',
      defaultMessage: 'Minimum {minimumLength} characters',
    },
    required: {
      id: 'ocpui.components.ManageUser.manageForm.validation.required',
      defaultMessage: 'Required',
    },
    requiredPermissionGroup: {
      id: 'ocpui.components.ManageUser.manageForm.validation.requiredPermissionGroup',
      defaultMessage: 'Must assign at least ONE permission group',
    },
    invalid: {
      id: 'ocpui.components.ManageUser.manageForm.validation.invalid',
      defaultMessage: 'Invalid value',
    },
    notMatch: {
      id: 'ocpui.components.ManageUser.manageForm.validation.notMatch',
      defaultMessage: 'Password does not match',
    },
    passwordPattern: {
      id: 'ocpui.components.ManageUser.manageForm.validation.passwordPattern',
      defaultMessage: 'Password must contain 8 characters and at least one number, one letter and one unique character such as @!#$',
    },
    duplicatedOrganization: {
      id: 'ocpui.components.ManageUser.manageForm.validation.duplicatedOrganization',
      defaultMessage: 'Cannot assign permission group to the SAME organization',
    },
  },
  hintText: {
    firstName: {
      id: 'ocpui.components.ManageUser.manageForm.hintText.firstName',
      defaultMessage: 'First Name',
    },
    lastName: {
      id: 'ocpui.components.ManageUser.manageForm.hintText.lastName',
      defaultMessage: 'Last Name',
    },
    username: {
      id: 'ocpui.components.ManageUser.manageForm.hintText.username',
      defaultMessage: 'Username',
    },
    password: {
      id: 'ocpui.components.ManageUser.manageForm.hintText.password',
      defaultMessage: 'Password',
    },
    confirmPassword: {
      id: 'ocpui.components.ManageUser.manageForm.hintText.confirmPassword',
      defaultMessage: 'Confirm Password',
    },
  },
  floatingLabelText: {
    firstName: {
      id: 'ocpui.components.ManageUser.manageForm.floatingLabelText.firstName',
      defaultMessage: 'First Name',
    },
    lastName: {
      id: 'ocpui.components.ManageUser.manageForm.floatingLabelText.lastName',
      defaultMessage: 'Last Name',
    },
    username: {
      id: 'ocpui.components.ManageUser.manageForm.floatingLabelText.username',
      defaultMessage: 'Username',
    },
    password: {
      id: 'ocpui.components.ManageUser.manageForm.floatingLabelText.password',
      defaultMessage: 'Password',
    },
    confirmPassword: {
      id: 'ocpui.components.ManageUser.manageForm.floatingLabelText.confirmPassword',
      defaultMessage: 'Confirm Password',
    },
  },
  saveButton: {
    id: 'ocpui.components.ManageUser.manageForm.saveButton',
    defaultMessage: 'Save',
  },
});
