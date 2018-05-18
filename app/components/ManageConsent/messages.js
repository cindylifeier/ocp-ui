/*
 * ManageConsent Messages
 *
 * This contains all the text for the ManageConsent component.
 */
import { defineMessages } from 'react-intl';

export default defineMessages({
  selectActors: {
    id: 'ocpui.components.ManageConsent.selectActors',
    defaultMessage: 'Selected Actors',
  },
  consentType: {
    id: 'ocpui.components.ManageConsent.consentType',
    defaultMessage: 'Make available to my entire care team',
  },
  medicalInformation: {
    id: 'ocpui.components.ManageConsent.medicalInformation',
    defaultMessage: 'Medical Information',
  },
  purposeOfUseInformation: {
    id: 'ocpui.components.ManageConsent.purposeOfUseInformation',
    defaultMessage: 'Purpose Of Use',
  },
  purposeOfUseTitle: {
    id: 'ocpui.components.ManageConsent.purposeOfUseTitle',
    defaultMessage: 'Choose for what purposes your medical information may be used.',
  },
  consentTermInformation: {
    id: 'ocpui.components.ManageConsent.consentTermInformation',
    defaultMessage: 'Consent Terms',
  },
  consentTermTitle: {
    id: 'ocpui.components.ManageConsent.consentTermTitle',
    defaultMessage: 'Enter a start and end date during which your medical records will be shared.',
  },
  validation: {
    minMedicalInfo: {
      id: 'ocpui.components.ManageConsent.manageForm.validation.minMedicalInfo',
      defaultMessage: 'Consent must have at least ONE medical information',
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
