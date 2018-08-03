/*
 * ResetPasswordForm Messages
 *
 * This contains all the text for the ResetPasswordForm component.
 */
import { defineMessages } from 'react-intl';

export default defineMessages({
  userFullNameLabel: {
    id: 'ocpui.components.ResetPasswordForm.userFullNameLabel',
    defaultMessage: 'User Name',
  },
  saveButton: {
    id: 'ocpui.components.ResetPasswordForm.saveButton',
    defaultMessage: 'Save',
  },
  cancelButton: {
    id: 'ocpui.components.ResetPasswordForm.cancelButton',
    defaultMessage: 'Cancel',
  },
  validation: {
    required: {
      id: 'ocpui.components.ResetPasswordForm.validation.required',
      defaultMessage: 'Required',
    },
    passwordPattern: {
      id: 'ocpui.components.ResetPasswordForm.validation.passwordPattern',
      defaultMessage: 'Password must contain 8 characters and at least one number, one letter and one unique character such as @!#$',
    },
    notMatch: {
      id: 'ocpui.components.ResetPasswordForm.validation.notMatch',
      defaultMessage: 'Password does not match',
    },
  },
  hintText: {
    newPassword: {
      id: 'ocpui.components.ResetPasswordForm.hintText.newPassword',
      defaultMessage: 'New Password',
    },
    confirmPassword: {
      id: 'ocpui.components.ResetPasswordForm.hintText.confirmPassword',
      defaultMessage: 'Confirm Password',
    },
  },
  floatingLabelText: {
    newPassword: {
      id: 'ocpui.components.ResetPasswordForm.floatingLabelText.newPassword',
      defaultMessage: 'New Password',
    },
    confirmPassword: {
      id: 'ocpui.components.ResetPasswordForm.floatingLabelText.confirmPassword',
      defaultMessage: 'Confirm Password',
    },
  },
});
