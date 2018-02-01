import queryString from '../../utils/queryString';
import getApiBaseUrl from '../../apiBaseUrlConfig';

const baseApiUrl = getApiBaseUrl();

const mockCareTeamsPage = {
  size: 2,
  totalNumberOfPages: 2,
  currentPage: 1,
  currentPageSize: 2,
  hasNextPage: true,
  hasPreviousPage: false,
  firstPage: true,
  lastPage: false,
  totalElements: 3,
  hasElements: true,
  elements: [{
    id: '111111',
    name: 'My Care Team One',
    // identifiers : [],
    status: {
      code: 'active',
      system: 'http://hl7.org/fhir/care-team-status',
      definition: 'The care team is currently participating in the coordination and delivery of care.',
      display: 'Active',
    },
    categories: [{
      code: 'encounter',
      display: 'Encounter',
      definition: 'This type of team focuses on one specific encounter. The encounter is determined by the context of use. For example, during an inpatient encounter, the nutrition support care team',
    }, {
      code: 'episode',
      display: 'Episode',
      definition: 'This type of team focuses on one specific episode of care with a defined time period or self-limiting process (e.g. 10 visits). The episode of care is determined by the context of use. For example, a maternity care team over 9 months.',
    },
    ],
    subject: {
      id: '11111',
      firstName: 'Patient',
      lastName: 'One',
    }, // patient
    participants: [{
      role: {
        code: '112247003',
        display: 'Medical doctor',
        definition: null,
      },
      // only one of `patient`, `practitioner`, `organization` or `relatedPerson` can exist at a time
      member: {
        type: 'practitioner', // can be one of `patient`, `practitioner`, `organization` or `relatedPerson`
        id: '700551',
        firstName: 'Tom2', // if not organization
        lastName: 'provider', // if not organization
        // name, // if organization
      },
      onBehalfOf: {
        id: '143191',
        name: 'Great Cross Hospital',
      },
    }, {
      role: {
        code: '394745000',
        display: 'General practice (organisation)',
        definition: null,
      },
      // only one of `patient`, `practitioner`, `organization` or `relatedPerson` can exist at a time
      member: {
        type: 'organization', // can be one of `patient`, `practitioner`, `organization` or `relatedPerson`
        id: '650858',
        // firstName: 'Tom2', // if not organization
        // lastName: 'provider', // if not organization
        name: 'Great Cross Hospital', // if organization
      },
      onBehalfOf: {
        id: '143191',
        name: 'Great Cross Hospital',
      },
    },
    ],
  }, {
    id: '222222',
    name: 'My Care Team Two',
    // identifiers : [],
    status: {
      code: 'active',
      system: 'http://hl7.org/fhir/care-team-status',
      definition: 'The care team is currently participating in the coordination and delivery of care.',
      display: 'Active',
    },
    categories: [{
      code: 'condition',
      display: 'Condition',
      definition: 'This type of team focuses on one specific condition. The condition is determined by the context of use. For example, a disease management team focused on one condition (e.g. diabetes).',
    },
    ],
    subject: {
      id: '11111',
      firstName: 'Patient',
      lastName: 'One',
    }, // patient
    participants: [{
      role: {
        code: '113157001',
        display: 'Grand-mother',
        definition: null,
      },
      // only one of `patient`, `practitioner`, `organization` or `relatedPerson` can exist at a time
      member: {
        type: 'relatedPerson', // can be one of `patient`, `practitioner`, `organization` or `relatedPerson`
        id: '121212',
        firstName: 'Her', // if not organization
        lastName: 'Grandmother', // if not organization
        // name, // if organization
      },
    },
    ],
  },
  ],
};

export default function getCareTeams(query) {
  const params = queryString(query);
  const requestURL = `${baseApiUrl}/careTeams/search${params}`;
  // TODO: remove once the backend is implemented
  console.log(`stubbing call for ${requestURL}`);
  // return request(requestURL);
  return new Promise((resolve) => setTimeout(() => resolve(mockCareTeamsPage), 2000));
}
