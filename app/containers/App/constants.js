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
export const GET_US_STATES = 'ocpui/App/GET_US_STATES';
export const GET_US_STATES_SUCCESS = 'ocpui/App/GET_US_STATES_SUCCESS';
export const GET_US_STATES_FROM_STORE = 'ocpui/App/GET_US_STATES_FROM_STORE';
export const GET_US_STATES_ERROR = 'ocpui/App/GET_US_STATES_ERROR';


/**
 * Look up types constants
 * @type {string}
 */
export const US_STATES = 'state';

