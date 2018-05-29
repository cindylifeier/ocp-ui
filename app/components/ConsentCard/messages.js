/*
 * ConsentCard Messages
 *
 * This contains all the text for the ConsentCard component.
 */
import { defineMessages } from 'react-intl';

export default defineMessages({
  header: {
    id: 'ocpui.components.ConsentCard.header',
    defaultMessage: 'This is the ConsentCard component !',
  },
  consentStatus: {
    id: 'ocpui.components.ConsentCard.consentStatus',
    defaultMessage: 'Consent state:',
  },
  consentCardHeader: {
    authorizedLabel: {
      id: 'ocpui.components.ConsentCard.consentCardHeader.authorizedLabel',
      defaultMessage: 'Authorized to share:',
    },
    sharingLabel: {
      id: 'ocpui.components.ConsentCard.consentCardHeader.sharingLabel',
      defaultMessage: 'Sharing with:',
    },
    effectiveDatesLabel: {
      id: 'ocpui.components.ConsentCard.consentCardHeader.effectiveDatesLabel',
      defaultMessage: 'Effective dates:',
    },
  },
});
