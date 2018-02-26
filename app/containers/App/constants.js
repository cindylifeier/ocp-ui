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
 *  Action type related constants
 * @type {string}
 */
export const GET_LOOKUPS = 'ocpui/App/GET_LOOKUPS';
export const GET_LOOKUPS_SUCCESS = 'ocpui/App/GET_LOOKUPS_SUCCESS';
export const GET_LOOKUPS_FROM_STORE = 'ocpui/App/GET_LOOKUPS_FROM_STORE';
export const GET_LOOKUPS_ERROR = 'ocpui/App/GET_LOOKUPS_ERROR';
export const GET_PATIENT = 'ocpui/ManageCareTeamPage/GET_PATIENT';
export const GET_PATIENT_SUCCESS = 'ocpui/ManageCareTeamPage/GET_PATIENT_SUCCESS';

/**
 *  Global object keys
 * @type {string}
 */
export const GLOBAL_LOOKUP_STATE_KEY = 'lookup';
export const GLOBAL_AUTH_STATE_KEY = 'auth';
export const GLOBAL_SHARED_DATA_KEY = 'sharedData';

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
export const PRACTITIONERROLES = 'PRACTITIONERROLES';
export const TELECOMSYSTEM = 'TELECOMSYSTEM';
export const TELECOMUSE = 'TELECOMUSE';
export const ORGANIZATIONIDENTIFIERSYSTEM = 'ORGANIZATIONIDENTIFIERSYSTEM';
export const ORGANIZATIONSTATUS = 'ORGANIZATIONSTATUS';
export const PATIENTIDENTIFIERSYSTEM = 'PATIENTIDENTIFIERSYSTEM';
export const ADMINISTRATIVEGENDER = 'ADMINISTRATIVEGENDER';
export const USCORERACE = 'USCORERACE';
export const USCOREETHNICITY = 'USCOREETHNICITY';
export const USCOREBIRTHSEX = 'USCOREBIRTHSEX';
export const LANGUAGE = 'LANGUAGE';
export const CARETEAMCATEGORY = 'CARETEAMCATEGORY';
export const PARTICIPANTTYPE = 'PARTICIPANTTYPE';
export const CARETEAMSTATUS = 'CARETEAMSTATUS';
export const PARTICIPANTROLE = 'PARTICIPANTROLE';
export const CARETEAMREASON = 'CARETEAMREASON';
// Healthcare Service Lookups - Start
export const HEALTHCARESERVICECATEGORY = 'HEALTHCARESERVICECATEGORY';
export const HEALTHCARESERVICETYPE = 'HEALTHCARESERVICETYPE';
export const HEALTHCARESERVICEREFERRALMETHOD = 'HEALTHCARESERVICEREFERRALMETHOD';
export const HEALTHCARESERVICESPECIALITY = 'HEALTHCARESERVICESPECIALITY';
export const HEALTHCARESERVICESTATUS = 'HEALTHCARESERVICESTATUS';
// Healthcare Service Lookups - End
// Activity Definition Lookups - Start
export const PUBLICATION_STATUS = 'PUBLICATION_STATUS';
export const DEFINITION_TOPIC = 'DEFINITION_TOPIC';
export const RESOURCE_TYPE = 'RESOURCE_TYPE';
export const ACTION_PARTICIPANT_TYPE = 'ACTION_PARTICIPANT_TYPE';
export const ACTION_PARTICIPANT_ROLE = 'ACTION_PARTICIPANT_ROLE';
export const RELATEDPERSONPATIENTRELATIONSHIPTYPES = 'RELATEDPERSONPATIENTRELATIONSHIPTYPES';
// Activity Definition Lookups - End
// Task Resource Lookups - Start
export const TASK_STATUS = 'TASK_STATUS';
export const REQUEST_INTENT = 'REQUEST_INTENT';
export const REQUEST_PRIORITY = 'REQUEST_PRIORITY';
export const TASK_PERFORMER_TYPE = 'TASK_PERFORMER_TYPE';
export const MANAGE_TASK_URL = '/ocp-ui/manage-task';
// Task Resource Lookups - End
/**
 *  Constants to hold the internal urls
 * @type {string}
 */
export const LOGIN_URL = '/ocp-ui/login';
export const HOME_URL = '/ocp-ui/home';
export const PATIENTS_URL = '/ocp-ui/patients';
export const MANAGE_PRACTITIONER_URL = '/ocp-ui/manage-practitioner';
export const MANAGE_ORGANIZATION_URL = '/ocp-ui/manage-organization';
export const MANAGE_CARE_TEAM_URL = '/ocp-ui/manage-care-team';
export const MANAGE_RELATED_PERSON_URL = '/ocp-ui/manage-related-person';

/**
 *  Constants to hold the default pagination page size and start page number
 * @type {number}
 */
export const DEFAULT_START_PAGE_NUMBER = 1;
export const DEFAULT_PAGE_SIZE = 10;

/**
 *  Min input field length.
 * @type {number}
 */
export const TEXT_MIN_LENGTH = 3;
/**
 *  Constants to hold the configuration for date picker
 * @type {object}
 */
export const DATE_PICKER_MODE = {
  PORTRAIT: 'portrait',
  LANDSCAPE: 'landscape',
};

/**
 *  Other constants
 */
export const ENTER_KEY = 'Enter';
export const EMPTY_STRING = '';

