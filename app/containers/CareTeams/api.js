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
    statusCode: 'active',
    statusDisplay: 'Active',
    reasonCodes: [{
      code: '109006',
      display: 'Anxiety disorder of childhood OR adolescence',
    }, {
      code: '122003',
      display: 'Choroidal hemorrhage',
    },
    ],
    categoryCode: 'encounter',
    categoryDisplay: 'Encounter',
    subjectId: '11111',
    subjectFirstName: 'Adam',
    subjectLastName: 'Smith',
    startDate: '01/01/2017',
    endDate: '02/01/2017',
    participants: [{
      roleCode: '112247003',
      roleDisplay: 'Medical doctor',
      memberId: '700551',
      memberFirstName: 'Gregory', // if not organization
      memberLastName: 'House', // if not organization
      memberType: 'practitioner', // can be one of `patient`, `practitioner`, `organization` or `relatedPerson`
      onBehalfOfId: '143191',
      onBehalfOfName: 'Great Cross Hospital',

    }, {
      roleCode: '394765007',
      roleDisplay: 'Prison practice',
      memberId: '650858',
      memberName: 'Great Cross Hospital', // if organization
      memberType: 'organization', // can be one of `patient`, `practitioner`, `organization` or `relatedPerson`
      onBehalfOfId: '143191',
      onBehalfOfName: 'Great Cross Hospital',
    },
    ],
  }, {
    id: '222222',
    name: 'My Care Team Two',
    statusCode: 'active',
    statusDisplay: 'Active',
    reasonCodes: [{
      code: '134006',
      display: 'Decreased hair growth',
    },
    ],
    categoryCode: 'condition',
    categoryDisplay: 'Condition',
    subjectId: '11111',
    subjectFirstName: 'Adam',
    subjectLastName: 'Smith',
    startDate: '04/01/2017',
    endDate: '08/01/2017',
    participants: [{
      roleCode: '113157001',
      roleDisplay: 'Grand-mother',
      memberId: '121212',
      memberFirstName: 'Granny', // if not organization
      memberLastName: 'Smith', // if not organization
      memberType: 'relatedPerson', // can be one of `patient`, `practitioner`, `organization` or `relatedPerson`
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
