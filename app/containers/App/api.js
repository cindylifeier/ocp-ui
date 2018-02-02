

import request from '../../utils/request';
import getApiBaseUrl from '../../apiBaseUrlConfig';

export function fetchLookups(lookupTypes) {
  const apiBaseURL = getApiBaseUrl();
  const lookupKeyList = lookupTypes.join();
  const requestURL = `${apiBaseURL}/lookups?lookUpTypeList=${lookupKeyList}`;
  return request(requestURL);
}
