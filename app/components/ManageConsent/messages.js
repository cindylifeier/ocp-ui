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
  medicalInformation: {
    id: 'ocpui.components.ManageConsent.medicalInformation',
    defaultMessage: 'Medical Information',
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
    consentType: {
      id: 'ocpui.components.ManageConsent.manageForm.hintText.consentType',
      defaultMessage: 'Make available to my entire care team',
    },
    purposeOfUseInformation: {
      id: 'ocpui.components.ManageConsent.manageForm.hintText.purposeOfUseInformation',
      defaultMessage: 'Purpose Of Use',
    },
    purposeOfUseTitle: {
      id: 'ocpui.components.ManageConsent.manageForm.hintText.purposeOfUseTitle',
      defaultMessage: 'Choose for what purposes your medical information may be used.',
    },
    purposeOfUseSubTitle: {
      id: 'ocpui.components.ManageConsent.manageForm.hintText.purposeOfUseSubTitle',
      defaultMessage: 'SHARE my medical record ONLY for the selected purpose of use.',
    },
    consentTermInformation: {
      id: 'ocpui.components.ManageConsent.manageForm.hintText.consentTermInformation',
      defaultMessage: 'Consent Terms',
    },
    consentTermTitle: {
      id: 'ocpui.components.ManageConsent.manageForm.hintText.consentTermTitle',
      defaultMessage: 'Enter a start and end date during which your medical records will be shared.',
    },
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
    consentType: {
      id: 'ocpui.components.ManageConsent.manageForm.floatingLabelText.consentType',
      defaultMessage: 'Make available to my entire care team',
    },
    purposeOfUseInformation: {
      id: 'ocpui.components.ManageConsent.manageForm.floatingLabelText.purposeOfUseInformation',
      defaultMessage: 'Purpose Of Use',
    },
    purposeOfUseTitle: {
      id: 'ocpui.components.ManageConsent.manageForm.floatingLabelText.purposeOfUseTitle',
      defaultMessage: 'Choose for what purposes your medical information may be used.',
    },
    purposeOfUseSubTitle: {
      id: 'ocpui.components.ManageConsent.manageForm.floatingLabelText.purposeOfUseSubTitle',
      defaultMessage: 'SHARE my medical record ONLY for the selected purpose of use.',
    },
    consentTermInformation: {
      id: 'ocpui.components.ManageConsent.manageForm.floatingLabelText.consentTermInformation',
      defaultMessage: 'Consent Terms',
    },
    consentTermTitle: {
      id: 'ocpui.components.ManageConsent.manageForm.floatingLabelText.consentTermTitle',
      defaultMessage: 'Enter a start and end date during which your medical records will be shared.',
    },
    consentStart: {
      id: 'ocpui.components.ManageConsent.manageForm.floatingLabelText.consentStart',
      defaultMessage: 'Consent Start Date',
    },
    consentEnd: {
      id: 'ocpui.components.ManageConsent.manageForm.floatingLabelText.consentEnd',
      defaultMessage: 'Consent End Date',
    },
    addFromActors: {
      id: 'ocpui.components.ManageConsent.manageForm.floatingLabelText.addFromActors',
      defaultMessage: 'To Authorize my information To',
    },
    addToActors: {
      id: 'ocpui.components.ManageConsent.manageForm.floatingLabelText.addToActors',
      defaultMessage: 'To Disclose my information To',
    },
  },
});
