/*
 * LocationTable Messages
 *
 * This contains all the text for the LocationTable component.
 */
import { defineMessages } from 'react-intl';

export default defineMessages({
  header: {
    id: 'ocpui.components.LocationTable.header',
    defaultMessage: 'This is the LocationTable component !',
  },
  tableHeaderColumnName: {
    id: 'ocpui.components.LocationTable.tableHeaderColumnName',
    defaultMessage: 'Name',
  },
  tableHeaderColumnStatus: {
    id: 'ocpui.components.LocationTable.tableHeaderColumnStatus',
    defaultMessage: 'Status',
  },
  tableHeaderColumnTelecoms: {
    id: 'ocpui.components.LocationTable.tableHeaderColumnTelecoms',
    defaultMessage: 'Telecoms',
  },
  tableHeaderColumnAddress: {
    id: 'ocpui.components.LocationTable.tableHeaderColumnAddress',
    defaultMessage: 'Address',
  },
  actionLabelEdit: {
    id: 'ocpui.components.LocationTable.actionLabelEdit',
    defaultMessage: 'Edit',
  },
  actionLabelAssignHealthCareService: {
    id: 'ocpui.components.LocationTable.actionLabelAssignHealthCareService',
    defaultMessage: 'Assign HealthCareService',
  },
  noLocationsFound: {
    id: 'ocpui.containers.Locations.noLocationsFound',
    defaultMessage: 'No locations loaded. Please select an organization to view its locations.',
  },
});
