export function fromBackendToFrontendOrganization(org) {
  const { name, addresses: addressArr, telecoms, logicalId: id, active: statusBool } = org;
  // format address
  let address = '';
  if (addressArr.length > 0) {
    const [firstAddress] = addressArr;
    const { line1, line2, city, stateCode, postalCode, countryCode } = firstAddress;
    address = [line1, line2, city, stateCode, postalCode, countryCode]
      .filter((i) => i && i !== '')
      .join(', ');
  }
  // format telephone
  const [firstTelecom] = telecoms;
  const { value: telephone } = firstTelecom || { value: '' };
  // format status
  const status = statusBool ? 'Active' : 'Inactive';
  const rs = { name, address, telephone, id, status };
  return rs;
}
