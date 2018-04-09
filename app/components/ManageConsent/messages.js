/*
 * ManageConsent Messages
 *
 * This contains all the text for the ManageConsent component.
 */
import { defineMessages } from 'react-intl';

export default defineMessages({
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
    selectCareTeams: {
      id: 'ocpui.components.ManageConsent.manageForm.hintText.selectCareTeams',
      defaultMessage: 'Selected Care Teams',
    },
    consentType: {
      id: 'ocpui.components.ManageConsent.manageForm.hintText.consentType',
      defaultMessage: 'Make available to my entire care team',
    },
    medicalInformation: {
      id: 'ocpui.components.ManageConsent.manageForm.hintText.medicalInformation',
      defaultMessage: 'Medical Information',
    },
    medInfoTitle: {
      id: 'ocpui.components.ManageConsent.manageForm.hintText.medInfoTitle',
      defaultMessage: 'Select how you would like to share your medical information.',
    },
    shareAll: {
      id: 'ocpui.components.ManageConsent.manageForm.hintText.shareAll',
      defaultMessage: 'SHARE my medical record WITHOUT ANY EXCEPTION of medical information categories',
    },
    shareSpecific: {
      id: 'ocpui.components.ManageConsent.manageForm.hintText.shareSpecific',
      defaultMessage: 'SHARE my medical record WITH EXCEPTION of specific medical information categories',
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
    selectCareTeams: {
      id: 'ocpui.components.ManageConsent.manageForm.floatingLabelText.selectCareTeams',
      defaultMessage: 'Selected Care Teams',
    },
    consentType: {
      id: 'ocpui.components.ManageConsent.manageForm.floatingLabelText.consentType',
      defaultMessage: 'Make available to my entire care team',
    },
    medicalInformation: {
      id: 'ocpui.components.ManageConsent.manageForm.floatingLabelText.medicalInformation',
      defaultMessage: 'Medical Information',
    },
    medInfoTitle: {
      id: 'ocpui.components.ManageConsent.manageForm.floatingLabelText.medInfoTitle',
      defaultMessage: 'Select how you would like to share your medical information.',
    },
    shareAll: {
      id: 'ocpui.components.ManageConsent.manageForm.floatingLabelText.shareAll',
      defaultMessage: 'SHARE my medical record WITHOUT ANY EXCEPTION of medical information categories',
    },
    shareSpecific: {
      id: 'ocpui.components.ManageConsent.manageForm.floatingLabelText.shareSpecific',
      defaultMessage: 'SHARE my medical record WITH EXCEPTION of specific medical information categories',
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
  },
});
