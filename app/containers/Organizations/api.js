export default function getOrganizations(query) {
  const param = query ? `?name=${query}` : '';
  return fetch(`http://localhost:8444/organizations${param}`)
    .then((resp) => resp.json())
    .then(mapToFrontendOrganizationList);
}

function mapToFrontendOrganizationList(resp) {
  return resp.map(mapToFrontendOrganization);
}

function mapToFrontendOrganization(org) {
  const { name, addresses: addressArr, telecoms, id, active: statusBool } = org;
  const [firstAddress] = addressArr;
  const { line1, line2, city, stateCode, postalCode, countryCode } = firstAddress;
  const address = [line1, line2, city, stateCode, postalCode, countryCode]
    .filter((i) => i && i !== '')
    .join(', ');
  const [firstTelecom] = telecoms;
  const { value: telephone } = firstTelecom || { value: '' };
  const status = statusBool ? 'Active' : 'Inactive';
  const rs = { name, address, telephone, id, status };
  return rs;
}
