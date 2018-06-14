import { getEndpoint, SMART_APP_SHORTCUTS_URL } from 'utils/endpointService';
import request from 'utils/request';


export function getAppShortcuts() {
  const baseEndpoint = getEndpoint(SMART_APP_SHORTCUTS_URL);
  return request(baseEndpoint);
}
