import request from '../../utils/request';
import { getEndpoint, LOOKUPS_API_URL } from '../../utils/endpointService';

export function fetchLookups(lookupTypes) {
  const baseEndpoint = getEndpoint(LOOKUPS_API_URL);
  const lookupKeyList = lookupTypes.join();
  const requestURL = `${baseEndpoint.url}?lookUpTypeList=${lookupKeyList}`;
  return request(requestURL, baseEndpoint.isSecured);
}
