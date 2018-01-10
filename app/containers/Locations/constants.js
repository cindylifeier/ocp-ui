/*
 *
 * Locations constants
 *
 */

export const LOCATION_TABLE_HEADERS = [
  { id: 1, name: 'Name' },
  { id: 2, name: 'Status' },
  { id: 3, name: 'Telecom' },
  { id: 4, name: 'Address' },
];

export const LOCATIONS = [
  { id: 1, name: 'name1', status: 'Active', telecome: 'telecome1', address: 'address1' },
  { id: 2, name: 'name2', status: 'Inactive', telecome: 'telecome2', address: 'address2' },
  { id: 3, name: 'name3', status: 'Suspended', telecome: 'telecome3', address: 'address3' },
  { id: 4, name: 'name4', status: 'Active', telecome: 'telecome4', address: 'address4' },
  { id: 5, name: 'name5', status: 'Inactive', telecome: 'telecome5', address: 'address5' },
];

export const DEFAULT_ACTION = 'app/Locations/DEFAULT_ACTION';

export const GET_FILTERED_LOCATIONS = 'app/Locations/GET_FILTERED_LOCATIONS';
export const GET_ACTIVE_LOCATIONS = 'app/Locations/GET_ACTIVE_LOCATIONS';
export const GET_LOCATIONS_SUCCESS = 'app/Locations/GET_LOCATIONS_SUCCESS';
export const SHOW_LOCATIONS = 'app/Locations/SHOW_LOCATIONS';

export const STATUS_ACTIVE = 'active';
export const STATUS_INACTIVE = 'inactive';
export const STATUS_SUSPENDED = 'suspended';

