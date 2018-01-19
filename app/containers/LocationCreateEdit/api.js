import getApiBaseUrl from '../../apiBaseUrlConfig';
import request from '../../utils/request';

const apiBaseURL = getApiBaseUrl();

export default function getLookups(lookupTypes) {
  const lookupKeyList = lookupTypes.join();
  const requestURL = `${apiBaseURL}/lookups?lookUpTypeList=${lookupKeyList}`;
  return request(requestURL);
}
