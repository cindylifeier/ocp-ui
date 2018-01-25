import request from '../../utils/request';
import getApiBaseUrl from '../../apiBaseUrlConfig';

const apiBaseUrl = getApiBaseUrl();

export default function createLocation(location, organizationId) {
  const url = `${apiBaseUrl}/organization/${organizationId}/location`;
  console.log(JSON.stringify(mapToBffLocation(location)));
  return request(url, {
    method: 'POST',
    body: JSON.stringify(mapToBffLocation(location)),
    headers: {
      'Content-Type': 'application/json',
    },
  });
}

function mapToBffLocation(rawlocation) {
  const location = {};
  location.name = rawlocation.name;
  location.managingLocationLogicalId = '';
  location.status = '';
  location.resourceURL = '';
  location.physicalType = rawlocation.physicalType;
  const { identifierSystem, identifierValue } = rawlocation;
  location.identifiers = [{
    system: identifierSystem,
    value: identifierValue,
    oid: '',
    priority: '',
    display: '',
  }];
  const { telecomSystem, telecomUse, telecomSystemValue } = rawlocation;
  location.telecoms = [{ system: telecomSystem, use: telecomUse, value: telecomSystemValue }];
  const { line1, line2, city, stateCode, postalCode, use } = rawlocation;
  location.address = { line1, line2, city, stateCode, postalCode, use, countryCode: 'US' };
  return location;
}
