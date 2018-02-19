/*
 * ManageRelatedPerson Messages
 *
 * This contains all the text for the ManageRelatedPerson component.
 */
import { defineMessages } from 'react-intl';

export default defineMessages({
  header: {
    id: 'ocpui.components.ManageRelatedPerson.header',
    defaultMessage: 'This is the ManageRelatedPerson component !',
  },
  validation: {
    minLength: {
      id: 'ocpui.components.ManageRelatedPerson.manageForm.validation.minLength',
      defaultMessage: 'Minimum {minimumLength} characters',
    },
    required: {
      id: 'ocpui.components.ManageRelatedPerson.manageForm.validation.required',
      defaultMessage: 'Required',
    },
    postalsCode: {
      id: 'ocpui.components.ManageRelatedPerson.manageForm.validation.postalCode',
      defaultMessage: 'Must be with formats: 12345 or 12345-6789',
    },
    invalid: {
      id: 'ocpui.components.ManageRelatedPerson.manageForm.validation.invalid',
      defaultMessage: 'Invalid value',
    },
    minStartDate: {
      id: 'ocpui.components.ManageRelatedPerson.manageForm.validation.minStartDate',
      defaultMessage: 'Start date field must be later than today',
    },
    minEndDate: {
      id: 'ocpui.components.ManageRelatedPerson.manageForm.validation.minEndDate',
      defaultMessage: 'End date field must be later than Start date field',
    },
  },
  hintText: {
    firstName: {
      id: 'ocpui.components.ManageRelatedPerson.manageForm.hintText.firstName',
      defaultMessage: 'First Name',
    },
    middleName: {
      id: 'ocpui.components.ManageRelatedPerson.manageForm.hintText.middleName',
      defaultMessage: 'Middle Name',
    },
    lastName: {
      id: 'ocpui.components.ManageRelatedPerson.manageForm.hintText.lastName',
      defaultMessage: 'Last Name',
    },
    dob: {
      id: 'ocpui.components.ManageRelatedPerson.manageForm.floatingLabelText.dob',
      defaultMessage: 'Date of Birth',
    },
    gender: {
      id: 'ocpui.components.ManageRelatedPerson.manageForm.hintText.gender',
      defaultMessage: 'Gender',
    },
    birthSex: {
      id: 'ocpui.components.ManageRelatedPerson.manageForm.floatingLabelText.birthSex',
      defaultMessage: 'Birth Sex',
    },
    identifierType: {
      id: 'ocpui.components.ManageRelatedPerson.manageForm.hintText.identifierType',
      defaultMessage: 'Identifier Type',
    },
    identifierValue: {
      id: 'ocpui.components.ManageRelatedPerson.manageForm.hintText.identifierValue',
      defaultMessage: 'Identifier Value',
    },
    telecomType: {
      id: 'ocpui.components.ManageRelatedPerson.manageForm.floatingLabelText.telecomType',
      defaultMessage: 'Telecom Type',
    },
    telecomValue: {
      id: 'ocpui.components.ManageRelatedPerson.manageForm.floatingLabelText.telecomValue',
      defaultMessage: 'Telecom Value',
    },
    address1: {
      id: 'ocpui.components.ManageRelatedPerson.manageForm.hintText.address1',
      defaultMessage: 'Address 1',
    },
    address2: {
      id: 'ocpui.components.ManageRelatedPerson.manageForm.hintText.address2',
      defaultMessage: 'Address 2',
    },
    city: {
      id: 'ocpui.components.ManageRelatedPerson.manageForm.hintText.city',
      defaultMessage: 'City',
    },
    state: {
      id: 'ocpui.components.ManageRelatedPerson.manageForm.hintText.state',
      defaultMessage: 'State',
    },
    postalCode: {
      id: 'ocpui.components.ManageRelatedPerson.manageForm.hintText.postalCode',
      defaultMessage: 'Zip Code',
    },
    country: {
      id: 'ocpui.components.ManageRelatedPerson.manageForm.hintText.country',
      defaultMessage: 'Country',
    },
    startDate: {
      id: 'ocpui.components.ManageRelatedPerson.manageForm.hintText.startDate',
      defaultMessage: 'Start Date',
    },
    endDate: {
      id: 'ocpui.components.ManageRelatedPerson.manageForm.hintText.endDate',
      defaultMessage: 'End Date',
    },
  },
  floatingLabelText: {
    firstName: {
      id: 'ocpui.components.ManageRelatedPerson.manageForm.floatingLabelText.firstName',
      defaultMessage: 'First Name',
    },
    middleName: {
      id: 'ocpui.components.ManageRelatedPerson.manageForm.floatingLabelText.middleName',
      defaultMessage: 'Middle Name',
    },
    lastName: {
      id: 'ocpui.components.ManageRelatedPerson.manageForm.floatingLabelText.lastName',
      defaultMessage: 'Last Name',
    },
    dob: {
      id: 'ocpui.components.ManageRelatedPerson.manageForm.floatingLabelText.dob',
      defaultMessage: 'Date of Birth',
    },
    gender: {
      id: 'ocpui.components.ManageRelatedPerson.manageForm.floatingLabelText.gender',
      defaultMessage: 'Gender',
    },
    birthSex: {
      id: 'ocpui.components.ManageRelatedPerson.manageForm.floatingLabelText.birthSex',
      defaultMessage: 'Birth Sex',
    },
    identifierType: {
      id: 'ocpui.components.ManageRelatedPerson.manageForm.floatingLabelText.identifierType',
      defaultMessage: 'Identifier Type',
    },
    identifierValue: {
      id: 'ocpui.components.ManageRelatedPerson.manageForm.floatingLabelText.identifierValue',
      defaultMessage: 'Identifier Value',
    },
    telecomType: {
      id: 'ocpui.components.ManageRelatedPerson.manageForm.floatingLabelText.telecomType',
      defaultMessage: 'Telecom Type',
    },
    telecomValue: {
      id: 'ocpui.components.ManageRelatedPerson.manageForm.floatingLabelText.telecomValue',
      defaultMessage: 'Telecom Value',
    },
    address1: {
      id: 'ocpui.components.ManageRelatedPerson.manageForm.floatingLabelText.address1',
      defaultMessage: 'Address 1',
    },
    address2: {
      id: 'ocpui.components.ManageRelatedPerson.manageForm.floatingLabelText.address2',
      defaultMessage: 'Address 2',
    },
    city: {
      id: 'ocpui.components.ManageRelatedPerson.manageForm.floatingLabelText.city',
      defaultMessage: 'City',
    },
    state: {
      id: 'ocpui.components.ManageRelatedPerson.manageForm.floatingLabelText.state',
      defaultMessage: 'State',
    },
    postalCode: {
      id: 'ocpui.components.ManageRelatedPerson.manageForm.floatingLabelText.postalCode',
      defaultMessage: 'Zip Code',
    },
    country: {
      id: 'ocpui.components.ManageRelatedPerson.manageForm.floatingLabelText.country',
      defaultMessage: 'Country',
    },
    startDate: {
      id: 'ocpui.components.ManageRelatedPerson.manageForm.floatingLabelText.startDate',
      defaultMessage: 'Start Date',
    },
    endDate: {
      id: 'ocpui.components.ManageRelatedPerson.manageForm.floatingLabelText.endDate',
      defaultMessage: 'End Date',
    },
    relationshipType: {
      id: 'ocpui.components.ManageRelatedPerson.manageForm.floatingLabelText.relationshipType',
      defaultMessage: 'Relationship Type',
    },
  },
});
