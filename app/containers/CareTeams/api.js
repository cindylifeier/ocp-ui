import queryString from '../../utils/queryString';
import { DEFAULT_PAGE_SIZE, DEFAULT_START_PAGE_NUMBER } from '../App/constants';
import request from '../../utils/request';
import { BASE_CARE_TEAMS_API_URL, getEndpoint } from '../../utils/endpointService';

export default function getCareTeams(patientId, pageNumber = DEFAULT_START_PAGE_NUMBER, statusList, pageSize = DEFAULT_PAGE_SIZE) {
  const searchType = 'patientId';
  const q = {
    searchValue: patientId,
    searchType,
    pageNumber,
    pageSize,
    statusList,
  };
  const params = queryString(q);
  const baseEndpoint = getEndpoint(BASE_CARE_TEAMS_API_URL);
  const requestURL = `${baseEndpoint}/search${params}`;
  return request(requestURL);
}
