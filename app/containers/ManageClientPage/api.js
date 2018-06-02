import request from 'utils/request';
import { getEndpoint, SMART_CLIENTS_URL } from 'utils/endpointService';

const baseEndpoint = getEndpoint(SMART_CLIENTS_URL);

export function saveClient(clientFormData) {
  const requestURL = `${baseEndpoint}`;
  request(requestURL, {
    method: 'POST',
    body: JSON.stringify(mapToBackendDto(clientFormData)),
    headers: {
      'Content-Type': 'application/json',
    },
  });
  return mapToClientMetaDto(clientFormData);
}

function mapToBackendDto(clientFormData) {
  const { appIcon, appLaunchUrl, client_id, client_type, name, redirect_uri, scope } = clientFormData;
  const appIconByte = appIcon && appIcon[0] && appIcon[0].base64;
  return {
    appIcon: appIconByte && appIconByte.substring(appIconByte.indexOf(',') + 1),
    appLaunchUrl,
    client_id,
    client_type,
    name,
    redirect_uri: redirect_uri.replace(/\s+/g, '').split(','),
    scope: scope.replace(/\s+/g, '').split(','),
  };
}

export function mapToClientMetaDto(clientFormData) {
  const { appIcon, appLaunchUrl, client_id, name } = clientFormData;
  const appIconByte = appIcon && appIcon[0] && appIcon[0].base64;
  return {
    appIcon: appIconByte && appIconByte.substring(appIconByte.indexOf(',') + 1),
    appLaunchUrl,
    clientId: client_id,
    clientName: name,
  };
}
