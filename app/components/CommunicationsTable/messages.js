/*
 * CommunicationsTable Messages
 *
 * This contains all the text for the CommunicationsTable component.
 */
import { defineMessages } from 'react-intl';

export default defineMessages({
  columnHeaderTimeSent: {
    id: 'ocpui.components.communicationTable.columnHeaderTimeSent',
    defaultMessage: 'Time Sent',
  },
  columnHeaderCategory: {
    id: 'ocpui.components.communicationTable.columnHeaderCategory',
    defaultMessage: 'Category',
  },
  columnHeaderContactMethod: {
    id: 'ocpui.components.communicationTable.columnHeaderContactMethod',
    defaultMessage: 'Contact Type',
  },
  columnHeaderTopic: {
    id: 'ocpui.components.communicationTable.columnHeaderTopic',
    defaultMessage: 'Topic',
  },
  columnHeaderReason: {
    id: 'ocpui.components.communicationTable.columnHeaderReason',
    defaultMessage: 'Reason',
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
