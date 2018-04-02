/*
 * ConsentTable Messages
 *
 * This contains all the text for the ConsentTable component.
 */
import { defineMessages } from 'react-intl';

export default defineMessages({
  tableColumnHeaderFromActor: {
    id: 'ocpui.components.ConsentTable.tableColumnHeader.FromActor',
    defaultMessage: 'Authorized to Share',
  },
  tableColumnHeaderToActor: {
    id: 'ocpui.components.ConsentTable.TableColumnHeader.ToActor',
    defaultMessage: 'Sharing with',
  },
  tableColumnHeaderPeriod: {
    id: 'ocpui.components.ConsentTable.tableColumnHeader.Period',
    defaultMessage: 'Effecitve Dates',
  },
  tableColumnHeaderStatus: {
    id: 'ocpui.components.ConsentTable.TableColumnHeader.Status',
    defaultMessage: 'Status',
  },
  edit: {
    id: 'ocpui.components.ConsentTable.edit',
    defaultMessage: 'Edit',
  },
  remove: {
    id: 'ocpui.components.ConsentTable.remove',
    defaultMessage: 'Remove',
  },
  noResultFound: {
    id: 'ocpui.components.ConsentTable.noResultFound',
    defaultMessage: 'No consents found',
  },
});
