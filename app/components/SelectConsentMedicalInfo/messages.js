/*
 * SelectConsentMedicalInfo Messages
 *
 * This contains all the text for the SelectConsentMedicalInfo component.
 */
import { defineMessages } from 'react-intl';

export default defineMessages({
  medInfoTitle: {
    id: 'ocpui.components.SelectConsentMedicalInfo.medInfoTitle',
    defaultMessage: 'Select how you would like to share your medical information.',
  },
  shareAll: {
    id: 'ocpui.components.SelectConsentMedicalInfo.shareAll',
    defaultMessage: 'SHARE my medical record WITHOUT ANY EXCEPTION of medical information categories',
  },
  shareSpecific: {
    id: 'ocpui.components.SelectConsentMedicalInfo.shareSpecific',
    defaultMessage: 'SHARE my medical record WITH EXCEPTION of specific medical information categories',
  },
});
