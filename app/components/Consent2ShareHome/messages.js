/*
 * Consent2ShareHomePage Messages
 *
 * This contains all the text for the Consent2ShareHomePage component.
 */
import { defineMessages } from 'react-intl';

export default defineMessages({
  header: {
    id: 'ocpui.components.Consent2ShareHome.header',
    defaultMessage: 'This is Consent2ShareHome component!',
  },
  patientBanner: {
    identifier: {
      id: 'ocpui.components.Consent2ShareHome.patientBanner.identifier',
      defaultMessage: 'Identifier',
    },
    birthDate: {
      id: 'ocpui.components.Consent2ShareHome.patientBanner.birthDate',
      defaultMessage: 'DOB',
    },
    gender: {
      id: 'ocpui.components.Consent2ShareHome.patientBanner.gender',
      defaultMessage: 'Gender',
    },
  },
  consentPanel: {
    panelSummary: {
      id: 'ocpui.components.Consent2ShareHome.consentPanel.panelSummary',
      defaultMessage: 'Patient\'s Consents',
    },
  },
});
