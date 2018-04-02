/*
 * ManageConsent Messages
 *
 * This contains all the text for the ManageConsent component.
 */
import { defineMessages } from 'react-intl';

export default defineMessages({
  title: {
    id: 'ocpui.components.ManageConsent.title',
    defaultMessage: 'General Information',
  },
  validation: {
    minLength: {
      id: 'ocpui.components.ManageConsent.manageForm.validation.minLength',
      defaultMessage: 'Minimum {minimumLength} characters',
    },
    required: {
      id: 'ocpui.components.ManageConsent.manageForm.validation.required',
      defaultMessage: 'Required',
    },
    invalid: {
      id: 'ocpui.components.ManageConsent.manageForm.validation.invalid',
      defaultMessage: 'Invalid value',
    },
    minStartDate: {
      id: 'ocpui.components.ManageConsent.manageForm.validation.minStartDate',
      defaultMessage: 'Consent Start date field must be later than today',
    },
    minEndDate: {
      id: 'ocpui.components.ManageConsent.manageForm.validation.minEndDate',
      defaultMessage: 'Consent End date field must be later than Consent Start date field',
    },
  },
  hintText: {
    consentStart: {
      id: 'ocpui.components.ManageConsent.manageForm.hintText.consentStart',
      defaultMessage: 'Consent Start Date',
    },
    consentEnd: {
      id: 'ocpui.components.ManageConsent.manageForm.hintText.consentEnd',
      defaultMessage: 'Consent End Date',
    },
  },
  floatingLabelText: {
    consentStart: {
      id: 'ocpui.components.ManageConsent.manageForm.floatingLabelText.consentStart',
      defaultMessage: 'Consent Start Date',
    },
    consentEnd: {
      id: 'ocpui.components.ManageConsent.manageForm.floatingLabelText.consentEnd',
      defaultMessage: 'Consent End Date',
    },
  },
});
