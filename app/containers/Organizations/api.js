export function mapToFrontendOrganizationList(resp) {
  const mappReponse = resp;
  const organizationElements = (resp.elements || []).map(mapToFrontendOrganization);
  mappReponse.elements = organizationElements;
  return mappReponse;
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
