/*
 * Locations Messages
 *
 * This contains all the text for the Locations component.
 */
import { defineMessages } from 'react-intl';

export default defineMessages({
  header: {
    id: 'ocpui.containers.Locations.header',
    defaultMessage: 'Locations',
  },
  filterLabel: {
    id: 'ocpui.containers.Locations.filterLabel',
    defaultMessage: 'Include',
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
  noLocationsFound: {
    id: 'ocpui.containers.Locations.noLocationsFound',
    defaultMessage: 'No locations loaded. Please select an organization to view its locations.',
  },
  labelOrganization: {
    id: 'ocpui.containers.Locations.labelOrganization',
    defaultMessage: 'Organization:',
  },
  labelLocation: {
    id: 'ocpui.containers.Locations.labelLocation',
    defaultMessage: 'Location:',
  },
  buttonLabelCreateNew: {
    id: 'ocpui.containers.Locations.buttonLabelCreateNew',
    defaultMessage: 'New Location',
  },
});
