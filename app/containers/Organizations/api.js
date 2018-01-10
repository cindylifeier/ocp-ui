import { fromJS } from 'immutable';

const mockData = fromJS([
  {
    identifier: {
      system: 'http://orionhealth.com/fhir/apps/organizationids',
      oid: null,
      value: 'org7632',
      priority: 0,
      display: null,
    },
    status: false,
    name: 'Goodwill Hospital',
    address: [
      {
        line1: '101 Maple Street',
        line2: null,
        city: 'Miami',
        stateCode: 'Florida',
        postalCode: '31009',
        countryCode: 'United States',
        use: null,
      },
    ],
    telecoms: [
      {
        system: null,
        value: '888-888-0000',
        use: 'WORK',
      },
    ],
  },
  {
    identifier: {
      system: 'http://orionhealth.com/fhir/apps/organizationids',
      oid: null,
      value: 'org3422',
      priority: 0,
      display: null,
    },
    status: true,
    name: 'Great Cross Hospital',
    address: [
      {
        line1: 'D Street',
        line2: null,
        city: 'Annapolis',
        stateCode: 'Maryland',
        postalCode: '31439',
        countryCode: 'United States',
        use: null,
      },
    ],
    telecoms: [
      {
        system: null,
        value: '912-176-4122',
        use: 'WORK',
      },
    ],
  },
  {
    identifier: {
      system: 'http://orionhealth.com/fhir/apps/organizationids',
      oid: null,
      value: 'org3429',
      priority: 0,
      display: null,
    },
    status: false,
    name: 'TPLUS',
    address: [
      {
        line1: 'TPLUS Building',
        line2: null,
        city: 'Seoul',
        stateCode: 'Sungdonggu',
        postalCode: '1234',
        countryCode: null,
        use: 'WORK',
      },
    ],
    telecoms: [],
  },
]);

export default function getOrganizations() {
  // TODO: enable this when web service is implemented
  // return fetch('/organizations')
  //   .then(resp => resp.json())
  //   .then(mapToFrontendOrganizationList);

  // stubbing backend call with fake latency
  return new Promise((resolve) => setTimeout(() => resolve(mockData.toJS()), 1000))
    .then(mapToFrontendOrganizationList);
}

function mapToFrontendOrganizationList(resp) {
  return resp.map(mapToFrontendOrganization);
}

function mapToFrontendOrganization(org) {
  const { name, address: addressArr, telecoms, identifier, status: statusBool } = org;
  const [firstAddress] = addressArr;
  const { line1, line2, city, stateCode, postalCode, countryCode } = firstAddress;
  const address = [line1, line2, city, stateCode, postalCode, countryCode]
    .filter((i) => i && i !== '')
    .join(', ');
  const [firstTelecom] = telecoms;
  const { value: telephone } = firstTelecom || { value: '' };
  // const id = `${identifier.system}|${identifier.value}`;
  const id = `${identifier.value}`;
  const status = statusBool ? 'Active' : 'Inactive';
  const rs = { name, address, telephone, id, status };
  return rs;
}
