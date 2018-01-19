import getApiBaseUrl from '../../apiBaseUrlConfig';
import request from '../../utils/request';
// import queryString from '../../utils/queryString';

const apiBaseURL = getApiBaseUrl();

export default function getLookupStates(lookupTypes) {
  console.log(lookupTypes);
  // const params = queryString({
  //   value: searchTerms,
  //   type: searchType,
  //   showInactive: includeInactive,
  //   page: currentPage,
  //   size: DEFAULT_PAGE_SIZE,
  // });

  const requestURL = `${apiBaseURL}/lookup/uspsStates`;
  return request(requestURL);
}
