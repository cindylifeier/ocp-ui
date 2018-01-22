/*
 * AppConstants
 * Each action has a corresponding type, which the reducer knows and picks up on.
 * To avoid weird typos between the reducer and the actions, we save them as
 * constants here. We prefix them with 'yourproject/YourComponent' so we avoid
 * reducers accidentally picking up actions they shouldn't.
 *
 * Follow this format:
 * export const YOUR_ACTION_CONSTANT = 'yourproject/YourContainer/YOUR_ACTION_CONSTANT';
 */

export const DEFAULT_LOCALE = 'en';

/**
 *  US state related constants
 * @type {string}
 */
export const GET_LOCATION_LOOKUPS = 'ocpui/App/GET_LOCATION_LOOKUPS';
export const GET_PATIENT_LOOKUPS = 'ocpui/App/GET_PATIENT_LOOKUPS';
export const GET_LOOKUPS_SUCCESS = 'ocpui/App/GET_LOOKUPS_SUCCESS';
export const GET_LOOKUPS_FROM_STORE = 'ocpui/App/GET_LOOKUPS_FROM_STORE';
export const GET_LOOKUPS_ERROR = 'ocpui/App/GET_LOOKUPS_ERROR';


/**
 * Look up types constants
 * @type {string}
 */
export const USPSSTATES = 'USPSSTATES';
export const LOCATIONSTATUS = 'LOCATIONSTATUS';
export const LOCATIONTYPE = 'LOCATIONTYPE';
export const ADDRESSTYPE = 'ADDRESSTYPE';
export const ADDRESSUSE = 'ADDRESSUSE';
export const IDENTIFIERSYSTEMS = 'IDENTIFIERSYSTEMS';
export const TELECOMSYSTEM = 'TELECOMSYSTEM';
export const TELECOMUSE = 'TELECOMUSE';

