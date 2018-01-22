/*
 * ManageOrganizationPage Messages
 *
 * This contains all the text for the ManageOrganizationPage component.
 */
import { defineMessages } from 'react-intl';

export default defineMessages({
  header: {
    id: 'app.containers.ManageOrganizationPage.header',
    defaultMessage: 'Manage Organization',
  },
  form: {
    name: {
      id: 'app.containers.ManageOrganizationPage.form.name',
      defaultMessage: 'Organization Name',
    },
    idType: {
      id: 'app.containers.ManageOrganizationPage.form.idType',
      defaultMessage: 'ID',
    },
    idValue: {
      id: 'app.containers.ManageOrganizationPage.form.idValue',
      defaultMessage: 'Please enter ID #',
    },
    status: {
      id: 'app.containers.ManageOrganizationPage.form.status',
      defaultMessage: 'Status',
    },
    address1: {
      id: 'app.containers.ManageOrganizationPage.form.address1',
      defaultMessage: 'Address 1',
    },
    address2: {
      id: 'app.containers.ManageOrganizationPage.form.address2',
      defaultMessage: 'Address 2',
    },
    city: {
      id: 'app.containers.ManageOrganizationPage.form.city',
      defaultMessage: 'City',
    },
    state: {
      id: 'app.containers.ManageOrganizationPage.form.state',
      defaultMessage: 'State',
    },
    zip: {
      id: 'app.containers.ManageOrganizationPage.form.zip',
      defaultMessage: 'Zip Code',
    },
    country: {
      id: 'app.containers.ManageOrganizationPage.form.country',
      defaultMessage: 'Country',
    },
    telecomSystem: {
      id: 'app.containers.ManageOrganizationPage.form.telecomSystem',
      defaultMessage: 'Telecom Type',
    },
    telecomValue: {
      id: 'app.containers.ManageOrganizationPage.form.telecomValue',
      defaultMessage: 'Telecom',
    },
    saveButton: {
      id: 'app.containers.ManageOrganizationPage.form.saveButton',
      defaultMessage: 'Save',
    },
  },
  validation: {
    required: {
      id: 'app.containers.ManageOrganizationPage.validation.required',
      defaultMessage: 'Required',
    },
    zipPattern: {
      id: 'app.containers.ManageOrganizationPage.validation.zipPattern',
      defaultMessage: 'Must be with formats: 12345 or 12345-6789',
    },
  },
});
