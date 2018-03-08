import { EMPTY_STRING } from '../App/constants';

export function fromBackendToFrontendOrganization(org) {
  const { name, addresses: addressArr, telecoms, logicalId: id, active: statusBool, identifiers: identifiersRaw } = org;
  const identifiers = identifiersRaw && identifiersRaw.map(({ oid, value }) => (`${oid || EMPTY_STRING}${oid ? ':' : EMPTY_STRING} ${value || EMPTY_STRING}`));
  // format address
  let address = '';
  if (addressArr.length > 0) {
    const [firstAddress] = addressArr;
    const { line1, line2, city, stateCode, postalCode, countryCode } = firstAddress;
    address = [line1, line2, city, stateCode, postalCode, countryCode]
      .filter((i) => i && i !== '')
      .join(', ');
  }
  // format status
  const status = statusBool ? 'Active' : 'Inactive';
  const rs = { name, address, telecoms, id, status, identifiers };
  return rs;
}
