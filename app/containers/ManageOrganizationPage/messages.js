/*
 * ManageOrganizationPage Messages
 *
 * This contains all the text for the ManageOrganizationPage component.
 */
import { defineMessages } from 'react-intl';

export default defineMessages({
  createModeTitle: {
    id: 'ocpui.containers.ManageOrganizationPage.createModeTitle',
    defaultMessage: 'Create Organization',
  },
  updateModeTitle: {
    id: 'ocpui.containers.ManageOrganizationPage.updateModeTitle',
    defaultMessage: 'Update Organization',
  },
  subtitle: {
    id: 'ocpui.containers.ManageOrganizationPage.subtitle',
    defaultMessage: 'General Information',
  },
  form: {
    name: {
      id: 'ocpui.containers.ManageOrganizationPage.form.name',
      defaultMessage: 'Organization Name',
    },
    identifierSystem: {
      id: 'ocpui.containers.ManageOrganizationPage.form.identifierSystem',
      defaultMessage: 'ID',
    },
    identifierValue: {
      id: 'ocpui.containers.ManageOrganizationPage.form.identifierValue',
      defaultMessage: 'Please enter ID #',
    },
    status: {
      id: 'ocpui.containers.ManageOrganizationPage.form.status',
      defaultMessage: 'Status',
    },
    line1: {
      id: 'ocpui.containers.ManageOrganizationPage.form.line1',
      defaultMessage: 'Address 1',
    },
    line2: {
      id: 'ocpui.containers.ManageOrganizationPage.form.line2',
      defaultMessage: 'Address 2',
    },
    city: {
      id: 'ocpui.containers.ManageOrganizationPage.form.city',
      defaultMessage: 'City',
    },
    stateCode: {
      id: 'ocpui.containers.ManageOrganizationPage.form.stateCode',
      defaultMessage: 'State',
    },
    postalCode: {
      id: 'ocpui.containers.ManageOrganizationPage.form.postalCode',
      defaultMessage: 'Zip Code',
    },
    country: {
      id: 'ocpui.containers.ManageOrganizationPage.form.country',
      defaultMessage: 'Country',
    },
    telecomSystem: {
      id: 'ocpui.containers.ManageOrganizationPage.form.telecomSystem',
      defaultMessage: 'Telecom Type',
    },
    telecomValue: {
      id: 'ocpui.containers.ManageOrganizationPage.form.telecomValue',
      defaultMessage: 'Telecom',
    },
    saveButton: {
      id: 'ocpui.containers.ManageOrganizationPage.form.saveButton',
      defaultMessage: 'Save',
    },
    savingButton: {
      id: 'ocpui.containers.ManageOrganizationPage.form.savingButton',
      defaultMessage: 'Saving...',
    },
    cancelButton: {
      id: 'ocpui.containers.ManageOrganizationPage.form.cancelButton',
      defaultMessage: 'Cancel',
    },
  },
  validation: {
    required: {
      id: 'ocpui.containers.ManageOrganizationPage.validation.required',
      defaultMessage: 'Required',
    },
    zipPattern: {
      id: 'ocpui.containers.ManageOrganizationPage.validation.zipPattern',
      defaultMessage: 'Must be with formats: 12345 or 12345-6789',
    },
  },
});
