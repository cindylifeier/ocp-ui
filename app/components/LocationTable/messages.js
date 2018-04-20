/*
 * LocationTable Messages
 *
 * This contains all the text for the LocationTable component.
 */

import { defineMessages } from 'react-intl';

export default defineMessages({
  locations: {
    id: 'ocpui.containers.Locations.locations',
    defaultMessage: 'locations',
  },
  filterLabel: {
    id: 'ocpui.containers.Locations.filterLabel',
    defaultMessage: 'Include:',
  },
  inactive: {
    id: 'ocpui.containers.Locations.checkbox.inactive',
    defaultMessage: 'Inactive',
  },
  suspended: {
    id: 'ocpui.containers.Locations.checkbox.suspended',
    defaultMessage: 'Suspended',
  },
  tableHeaderColumnName: {
    id: 'ocpui.containers.Locations.tableHeaderColumnName',
    defaultMessage: 'Name',
  },
  tableHeaderColumnStatus: {
    id: 'ocpui.containers.Locations.tableHeaderColumnStatus',
    defaultMessage: 'Status',
  },
  tableHeaderColumnTelecoms: {
    id: 'ocpui.containers.Locations.tableHeaderColumnTelecoms',
    defaultMessage: 'Telecoms',
  },
  tableHeaderColumnAddress: {
    id: 'ocpui.containers.Locations.tableHeaderColumnAddress',
    defaultMessage: 'Address',
  },
  actionLabelEdit: {
    id: 'ocpui.containers.Locations.actionLabelEdit',
    defaultMessage: 'Edit',
  },
  actionLabelAssignHealthCareService: {
    id: 'ocpui.containers.Locations.actionLabelAssignHealthCareService',
    defaultMessage: 'Assign HealthCareService',
  },
});
