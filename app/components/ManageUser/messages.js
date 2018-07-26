/*
 * ManageUser Messages
 *
 * This contains all the text for the ManageUser component.
 */
import { defineMessages } from 'react-intl';

export default defineMessages({
  header: {
    id: 'ocpui.components.ManageUser.header',
    defaultMessage: 'This is the ManageUser component !',
  },
  title: {
    id: 'ocpui.components.ManageUser.manageForm.title',
    defaultMessage: 'General Information',
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
    invalid: {
      id: 'ocpui.components.ManageUser.manageForm.validation.invalid',
      defaultMessage: 'Invalid value',
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
    repeatPassword: {
      id: 'ocpui.components.ManageUser.manageForm.hintText.repeatPassword',
      defaultMessage: 'Repeat Password',
    },
    organization: {
      id: 'ocpui.components.ManageUser.manageForm.hintText.organization',
      defaultMessage: 'Organization',
    },
    permissionGroup: {
      id: 'ocpui.components.ManageUser.manageForm.hintText.permissionGroup',
      defaultMessage: 'Permission Group',
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
    repeatPassword: {
      id: 'ocpui.components.ManageUser.manageForm.floatingLabelText.repeatPassword',
      defaultMessage: 'Repeat Password',
    },
    organization: {
      id: 'ocpui.components.ManageUser.manageForm.floatingLabelText.organization',
      defaultMessage: 'Organization',
    },
    permissionGroup: {
      id: 'ocpui.components.ManageUser.manageForm.floatingLabelText.permissionGroup',
      defaultMessage: 'Permission Group',
    },
  },
});
