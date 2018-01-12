import queryString from '../../utils/queryString';

const baseApiUrl = 'http://localhost:8446/ocp-fis';

export default function getOrganizations(searchValue, showInactive, searchType) {
  const params = queryString({ searchValue, showInactive, searchType });
  return fetch(`${baseApiUrl}/organizations/search${params}`)
    .then((resp) => resp.json())
    .then(mapToFrontendOrganizationList);
}

function mapToFrontendOrganizationList(resp) {
  return (resp.elements || []).map(mapToFrontendOrganization);
}

function mapToFrontendOrganization(org) {
  const { name, addresses: addressArr, telecoms, logicalId: id, active: statusBool } = org;
  // format address
  const [firstAddress] = addressArr;
  const { line1, line2, city, stateCode, postalCode, countryCode } = firstAddress;
  const address = [line1, line2, city, stateCode, postalCode, countryCode]
    .filter((i) => i && i !== '')
    .join(', ');
  // format telephone
  const [firstTelecom] = telecoms;
  const { value: telephone } = firstTelecom || { value: '' };
  // format status
  const status = statusBool ? 'Active' : 'Inactive';
  const rs = { name, address, telephone, id, status };
  return rs;
}
