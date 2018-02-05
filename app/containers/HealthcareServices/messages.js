/*
 * HealthcareServices Messages
 *
 * This contains all the text for the HealthcareServices component.
 */
import { defineMessages } from 'react-intl';

export default defineMessages({
  header: {
    id: 'ocpui.containers.HealthcareServices.header',
    defaultMessage: 'Healthcare Services',
  },
  organizationNotSelected: {
    id: 'ocpui.containers.HealthcareServices.organizationNotSelected',
    defaultMessage: 'No healthcare services loaded. Please select an organization to view its healthcare services.',
  },
  noHealthcareServicesFound: {
    id: 'ocpui.containers.HealthcareServices.noHealthcareServicesFound',
    defaultMessage: 'No healthcare services found.',
  },
  inactive: {
    id: 'ocpui.containers.HealthcareServices.checkbox.inactive',
    defaultMessage: 'Include Inactive',
  },
});
