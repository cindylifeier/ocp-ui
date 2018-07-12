import request from 'utils/request';
import queryString from 'utils/queryString';
import { BASE_RELATED_PERSONS_API_URL, getEndpoint } from 'utils/endpointService';
import { DEFAULT_PAGE_SIZE } from 'containers/App/constants';


export function searchRelatedPersons(searchKey, searchValue, showInActive, patientId, pageNumber) {
  const baseEndpoint = getEndpoint(BASE_RELATED_PERSONS_API_URL);
  const params = queryString({
    patientId,
    searchKey,
    searchValue,
    showInActive,
    pageNumber,
    pageSize: DEFAULT_PAGE_SIZE,
  });
  const requestURL = `${baseEndpoint}/search${params}`;
  return request(requestURL);
}
