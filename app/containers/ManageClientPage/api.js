import request from 'utils/request';
import { BASE_SMART_URL, getEndpoint } from 'utils/endpointService';

const baseEndpoint = getEndpoint(BASE_SMART_URL);

export function saveClient(clientFormData) {
  const requestURL = `${baseEndpoint}/clients`;
  return request(requestURL, {
    method: 'POST',
    body: JSON.stringify(mapToBackendDto(clientFormData)),
    headers: {
      'Content-Type': 'application/json',
    },
  });
}

function mapToBackendDto(clientFormData) {
  const { appIcon, appLaunchUrl, client_id, client_type, name, redirect_uri, scopes } = clientFormData;
  const appIconByte = appIcon && appIcon[0] && appIcon[0].base64;
  return {
    appIcon: appIconByte.substring(appIconByte.indexOf(',') + 1),
    appLaunchUrl,
    client_id,
    client_type,
    name,
    redirect_uri: redirect_uri.replace(/\s+/g, '').split(','),
    scopes: scopes.replace(/\s+/g, '').split(','),
  };
}
