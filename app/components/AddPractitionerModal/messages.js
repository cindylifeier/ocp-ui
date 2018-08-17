/*
 * AddPractitionerModal Messages
 *
 * This contains all the text for the AddPractitionerModal component.
 */
import { defineMessages } from 'react-intl';

export default defineMessages({
  title: {
    id: 'ocpui.components.AddPractitionerModal.title',
    defaultMessage: 'New Practitioner/Resource',
  },
  closeButton: {
    id: 'ocpui.components.AddPractitionerModal.closeButton',
    defaultMessage: 'Close',
  },
  checkExistingButton: {
    id: 'ocpui.components.CreatePractitionerForm.checkExistingButton',
    defaultMessage: 'Check Existing',
  },
  validation: {
    required: {
      id: 'ocpui.components.CreatePractitionerForm.validation.required',
      defaultMessage: 'Required',
    },
  },
  hintText: {
    firstName: {
      id: 'ocpui.components.CreatePractitionerForm.hintText.firstName',
      defaultMessage: 'First Name',
    },
    lastName: {
      id: 'ocpui.components.CreatePractitionerForm.hintText.lastName',
      defaultMessage: 'Last Name',
    },
    identifierType: {
      id: 'ocpui.components.CreatePractitionerForm.hintText.identifierType',
      defaultMessage: 'Identifier Type',
    },
    identifierValue: {
      id: 'ocpui.components.CreatePractitionerForm.hintText.identifierValue',
      defaultMessage: 'Identifier Value',
    },
  },
  floatingLabelText: {
    firstName: {
      id: 'ocpui.components.CreatePractitionerForm.floatingLabelText.firstName',
      defaultMessage: 'First Name',
    },
    lastName: {
      id: 'ocpui.components.CreatePractitionerForm.floatingLabelText.lastName',
      defaultMessage: 'Last Name',
    },
    identifierType: {
      id: 'ocpui.components.CreatePractitionerForm.floatingLabelText.identifierType',
      defaultMessage: 'Identifier Type',
    },
    identifierValue: {
      id: 'ocpui.components.CreatePractitionerForm.floatingLabelText.identifierValue',
      defaultMessage: 'Identifier Value',
    },
  },
});
