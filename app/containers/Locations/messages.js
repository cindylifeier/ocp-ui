/*
 * Locations Messages
 *
 * This contains all the text for the Locations component.
 */
import { defineMessages } from 'react-intl';

export default defineMessages({
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
