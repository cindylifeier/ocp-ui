import request from 'utils/request';
import queryString from 'utils/queryString';
import { BASE_CARE_TEAMS_API_URL, getEndpoint } from 'utils/endpointService';
import { DEFAULT_PAGE_SIZE } from 'containers/App/constants';


export function searchRelatedPersons(careTeamId, pageNumber, searchTerms) {
  const baseEndpoint = getEndpoint(BASE_CARE_TEAMS_API_URL);
  const params = queryString({
    name: searchTerms,
    pageNumber,
    pageSize: DEFAULT_PAGE_SIZE,
  });
  const requestURL = `${baseEndpoint}/${careTeamId}/related-persons/search${params}`;
  return request(requestURL);
}
