/*
 * SelectMedicalInformation Messages
 *
 * This contains all the text for the SelectMedicalInformation component.
 */
import { defineMessages } from 'react-intl';

export default defineMessages({
  medicalInfoTitle: {
    id: 'ocpui.components.SelectMedicalInformation.medicalInfoTitle',
    defaultMessage: 'Select how you would like to share your medical information.',
  },
  shareAll: {
    id: 'ocpui.components.SelectMedicalInformation.shareAll',
    defaultMessage: '<strong>SHARE</strong> my medical record <strong>WITHOUT ANY EXCEPTION</strong> of medical information categories',
  },
  shareSpecific: {
    id: 'ocpui.components.SelectMedicalInformation.shareSpecific',
    defaultMessage: '<strong>SHARE</strong> my medical record <strong>WITH EXCEPTION</strong> of specific medical information categories',
  },
  medicalInfoDialogTitle: {
    id: 'ocpui.components.SelectMedicalInformation.medicalInfoDialogTitle',
    defaultMessage: 'Privacy Settings',
  },
});
