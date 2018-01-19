import queryString from '../../utils/queryString';
import getApiBaseUrl from '../../apiBaseUrlConfig';
import { DEFAULT_PAGE_SIZE } from '../App/constants';
import request from '../../utils/request';

const baseApiUrl = getApiBaseUrl();

export default function searchOrganizations(searchValue, showInactive, searchType, page) {
  const params = queryString({ searchValue, showInactive, searchType, size: DEFAULT_PAGE_SIZE, page });
  const requestURL = `${baseApiUrl}/organizations/search${params}`;
  return request(requestURL)
    .then(mapToFrontendOrganizationList);
}

function mapToFrontendOrganizationList(resp) {
  const mapResponse = resp;
  mapResponse.elements = (resp.elements || []).map(mapToFrontendOrganization);
  return mapResponse;
}

function mapToFrontendOrganization(org) {
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
