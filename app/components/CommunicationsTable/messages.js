/*
 * CommunicationsTable Messages
 *
 * This contains all the text for the CommunicationsTable component.
 */
import { defineMessages } from 'react-intl';

export default defineMessages({
  columnHeaderCategory: {
    id: 'ocpui.components.communicationTable.columnHeaderCategory',
    defaultMessage: 'Category',
  },
  columnHeaderContactMethod: {
    id: 'ocpui.components.communicationTable.columnHeaderContactMethod',
    defaultMessage: 'Contact Method',
  },
  columnHeaderRecipients: {
    id: 'ocpui.components.communicationTable.columnHeaderRecipients',
    defaultMessage: 'Recipients',
  },
  columnHeaderSender: {
    id: 'ocpui.components.communicationTable.columnHeaderSender',
    defaultMessage: 'Sender',
  },
  columnHeaderSent: {
    id: 'ocpui.components.communicationTable.columnHeaderSent',
    defaultMessage: 'Sent',
  },
  columnHeaderStatus: {
    id: 'ocpui.components.communicationTable.columnHeaderStatus',
    defaultMessage: 'Status',
  },
  noCommunications: {
    id: 'ocpui.containers.communicationsTable.noCommunications',
    defaultMessage: 'No Communications for selected patient. Please create communication.',
  },
});
