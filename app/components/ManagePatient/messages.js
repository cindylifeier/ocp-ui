/*
 * ManagePatient Messages
 *
 * This contains all the text for the ManagePatient component.
 */
import { defineMessages } from 'react-intl';

export default defineMessages({
  title: {
    id: 'ocpui.components.ManagePatient.manageForm.title',
    defaultMessage: 'General Information',
  },
  validation: {
    minLength: {
      id: 'ocpui.components.ManagePatient.manageForm.validation.minLength',
      defaultMessage: 'Minimum {minimumLength} characters',
    },
    required: {
      id: 'ocpui.components.ManagePatient.manageForm.validation.required',
      defaultMessage: 'Required',
    },
    email: {
      id: 'ocpui.components.ManagePatient.manageForm.validation.email',
      defaultMessage: 'Email must be a valid email',
    },
    postalCode: {
      id: 'ocpui.components.ManagePatient.manageForm.validation.postalCode',
      defaultMessage: 'Must be with formats: 12345 or 12345-6789',
    },
    invalid: {
      id: 'ocpui.components.ManagePatient.manageForm.validation.invalid',
      defaultMessage: 'Invalid value',
    },
  },
  hintText: {
    firstName: {
      id: 'ocpui.components.ManagePatient.manageForm.hintText.firstName',
      defaultMessage: 'First Name',
    },
    middleName: {
      id: 'ocpui.components.ManagePatient.manageForm.hintText.middleName',
      defaultMessage: 'Middle Name',
    },
    lastName: {
      id: 'ocpui.components.ManagePatient.manageForm.hintText.lastName',
      defaultMessage: 'Last Name',
    },
    dob: {
      id: 'ocpui.components.ManagePatient.manageForm.floatingLabelText.dob',
      defaultMessage: 'Date of Birth',
    },
    gender: {
      id: 'ocpui.components.ManagePatient.manageForm.hintText.gender',
      defaultMessage: 'Gender',
    },
    language: {
      id: 'ocpui.components.ManagePatient.manageForm.floatingLabelText.language',
      defaultMessage: 'Language',
    },
    race: {
      id: 'ocpui.components.ManagePatient.manageForm.floatingLabelText.race',
      defaultMessage: 'Race',
    },
    ethnicity: {
      id: 'ocpui.components.ManagePatient.manageForm.floatingLabelText.ethnicity',
      defaultMessage: 'Ethnicity',
    },
    birthsex: {
      id: 'ocpui.components.ManagePatient.manageForm.floatingLabelText.birthsex',
      defaultMessage: 'Birthsex',
    },
    identifierType: {
      id: 'ocpui.components.ManagePatient.manageForm.hintText.identifierType',
      defaultMessage: 'Identifier Type',
    },
    identifierValue: {
      id: 'ocpui.components.ManagePatient.manageForm.hintText.identifierValue',
      defaultMessage: 'Identifier Value',
    },
    email: {
      id: 'ocpui.components.ManagePatient.manageForm.hintText.email',
      defaultMessage: 'Email',
    },
    phone: {
      id: 'ocpui.components.ManagePatient.manageForm.hintText.phone',
      defaultMessage: 'Phone',
    },
    address1: {
      id: 'ocpui.components.ManagePatient.manageForm.hintText.address1',
      defaultMessage: 'Address 1',
    },
    address2: {
      id: 'ocpui.components.ManagePatient.manageForm.hintText.address2',
      defaultMessage: 'Address 2',
    },
    city: {
      id: 'ocpui.components.ManagePatient.manageForm.hintText.city',
      defaultMessage: 'City',
    },
    state: {
      id: 'ocpui.components.ManagePatient.manageForm.hintText.state',
      defaultMessage: 'State',
    },
    postalCode: {
      id: 'ocpui.components.ManagePatient.manageForm.hintText.postalCode',
      defaultMessage: 'Zip Code',
    },
    country: {
      id: 'ocpui.components.ManagePatient.manageForm.hintText.country',
      defaultMessage: 'Country',
    },
  },
  floatingLabelText: {
    firstName: {
      id: 'ocpui.components.ManagePatient.manageForm.floatingLabelText.firstName',
      defaultMessage: 'First Name',
    },
    middleName: {
      id: 'ocpui.components.ManagePatient.manageForm.floatingLabelText.middleName',
      defaultMessage: 'Middle Name',
    },
    lastName: {
      id: 'ocpui.components.ManagePatient.manageForm.floatingLabelText.lastName',
      defaultMessage: 'Last Name',
    },
    dob: {
      id: 'ocpui.components.ManagePatient.manageForm.floatingLabelText.dob',
      defaultMessage: 'Date of Birth',
    },
    gender: {
      id: 'ocpui.components.ManagePatient.manageForm.floatingLabelText.gender',
      defaultMessage: 'Gender',
    },
    language: {
      id: 'ocpui.components.ManagePatient.manageForm.floatingLabelText.language',
      defaultMessage: 'Language',
    },
    race: {
      id: 'ocpui.components.ManagePatient.manageForm.floatingLabelText.race',
      defaultMessage: 'Race',
    },
    ethnicity: {
      id: 'ocpui.components.ManagePatient.manageForm.floatingLabelText.ethnicity',
      defaultMessage: 'Ethnicity',
    },
    birthsex: {
      id: 'ocpui.components.ManagePatient.manageForm.floatingLabelText.birthsex',
      defaultMessage: 'Birthsex',
    },
    identifierType: {
      id: 'ocpui.components.ManagePatient.manageForm.floatingLabelText.identifierType',
      defaultMessage: 'Identifier Type',
    },
    identifierValue: {
      id: 'ocpui.components.ManagePatient.manageForm.floatingLabelText.identifierValue',
      defaultMessage: 'Identifier Value',
    },
    email: {
      id: 'ocpui.components.ManagePatient.manageForm.floatingLabelText.email',
      defaultMessage: 'Email',
    },
    phone: {
      id: 'ocpui.components.ManagePatient.manageForm.floatingLabelText.phone',
      defaultMessage: 'Phone',
    },
    address1: {
      id: 'ocpui.components.ManagePatient.manageForm.floatingLabelText.address1',
      defaultMessage: 'Address 1',
    },
    address2: {
      id: 'ocpui.components.ManagePatient.manageForm.floatingLabelText.address2',
      defaultMessage: 'Address 2',
    },
    city: {
      id: 'ocpui.components.ManagePatient.manageForm.floatingLabelText.city',
      defaultMessage: 'City',
    },
    state: {
      id: 'ocpui.components.ManagePatient.manageForm.floatingLabelText.state',
      defaultMessage: 'State',
    },
    postalCode: {
      id: 'ocpui.components.ManagePatient.manageForm.floatingLabelText.postalCode',
      defaultMessage: 'Zip Code',
    },
    country: {
      id: 'ocpui.components.ManagePatient.manageForm.floatingLabelText.country',
      defaultMessage: 'Country',
    },
  },
});
