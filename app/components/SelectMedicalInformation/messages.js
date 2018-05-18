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
    defaultMessage: 'SHARE my medical record WITHOUT ANY EXCEPTION of medical information categories',
  },
  shareSpecific: {
    id: 'ocpui.components.SelectMedicalInformation.shareSpecific',
    defaultMessage: 'SHARE my medical record WITH EXCEPTION of specific medical information categories',
  },
  medicalInfoDialogTitle: {
    id: 'ocpui.components.SelectMedicalInformation.medicalInfoDialogTitle',
    defaultMessage: 'Privacy Settings',
  },
});
