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
export const GET_LOOKUPS = 'ocpui/App/GET_LOOKUPS';
export const GET_LOOKUPS_SUCCESS = 'ocpui/App/GET_LOOKUPS_SUCCESS';
export const GET_LOOKUPS_FROM_STORE = 'ocpui/App/GET_LOOKUPS_FROM_STORE';
export const GET_LOOKUPS_ERROR = 'ocpui/App/GET_LOOKUPS_ERROR';


/**
 * Look up types constants
 * @type {string}
 */
export const USPSSTATES = 'USPSSTATES';
export const LOCATIONSTATUS = 'LOCATIONSTATUS';
export const LOCATIONPHYSICALTYPE = 'LOCATIONPHYSICALTYPE';
export const ADDRESSTYPE = 'ADDRESSTYPE';
export const ADDRESSUSE = 'ADDRESSUSE';
export const LOCATIONIDENTIFIERSYSTEM = 'LOCATIONIDENTIFIERSYSTEM';
export const PRACTITIONERIDENTIFIERSYSTEM = 'PRACTITIONERIDENTIFIERSYSTEM';
export const TELECOMSYSTEM = 'TELECOMSYSTEM';
export const TELECOMUSE = 'TELECOMUSE';
export const PRACTITIONERROLES = 'PRACTITIONERROLES';


/**
 *  Constants to hold the default pagination page size
 * @type {number}
 */
export const DEFAULT_PAGE_SIZE = 10;

/**
 *  Other constants
 */
export const ENTER_KEY = 'Enter';
export const EMPTY_STRING = '';
