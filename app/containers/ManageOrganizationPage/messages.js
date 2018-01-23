/*
 * ManageOrganizationPage Messages
 *
 * This contains all the text for the ManageOrganizationPage component.
 */
import { defineMessages } from 'react-intl';

export default defineMessages({
  header: {
    id: 'ocpui.containers.ManageOrganizationPage.header',
    defaultMessage: 'Manage Organization',
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
    address1: {
      id: 'ocpui.containers.ManageOrganizationPage.form.address1',
      defaultMessage: 'Address 1',
    },
    address2: {
      id: 'ocpui.containers.ManageOrganizationPage.form.address2',
      defaultMessage: 'Address 2',
    },
    city: {
      id: 'ocpui.containers.ManageOrganizationPage.form.city',
      defaultMessage: 'City',
    },
    state: {
      id: 'ocpui.containers.ManageOrganizationPage.form.state',
      defaultMessage: 'State',
    },
    zip: {
      id: 'ocpui.containers.ManageOrganizationPage.form.zip',
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
