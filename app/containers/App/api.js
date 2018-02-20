import request from '../../utils/request';
import { getEndpoint, LOOKUPS_API_URL } from '../../utils/endpointService';

export function fetchLookups(lookupTypes) {
  const requestEndpoint = getEndpoint(LOOKUPS_API_URL);
  const lookupKeyList = lookupTypes.join();
  const requestURL = `${requestEndpoint.url}?lookUpTypeList=${lookupKeyList}`;
  return request(requestURL, requestEndpoint.isSecured);
}
