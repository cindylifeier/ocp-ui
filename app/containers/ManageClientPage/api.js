import request from 'utils/request';
import { getEndpoint, SMART_CLIENTS_URL } from 'utils/endpointService';

const baseEndpoint = getEndpoint(SMART_CLIENTS_URL);

export function getClients() {
  return request(baseEndpoint);
}

export function saveClient(clientFormData) {
  const requestURL = `${baseEndpoint}`;
  return request(requestURL, {
    method: 'POST',
    body: JSON.stringify(mapToBackendDto(clientFormData)),
    headers: {
      'Content-Type': 'application/json',
    },
  });
}

export function updateClient(clientFormData) {
  const requestURL = `${baseEndpoint}/${clientFormData.client_id}`;
  request(requestURL, {
    method: 'PUT',
    body: JSON.stringify(mapToBackendDto(clientFormData)),
    headers: {
      'Content-Type': 'application/json',
    },
  });
  return mapToClientMetaDto(clientFormData);
}

export function deleteClient(clientId) {
  const requestURL = `${baseEndpoint}/${clientId}`;
  return request(requestURL, {
    method: 'DELETE',
  });
}

function mapToBackendDto(clientFormData) {
  const { appIcon, appLaunchUrl, clientId, clientType, name, redirectUri, scope } = clientFormData;
  const appIconByte = appIcon && appIcon[0] && appIcon[0].base64;
  return {
    appIcon: appIconByte && appIconByte.substring(appIconByte.indexOf(',') + 1),
    appLaunchUrl,
    clientId,
    clientType,
    name,
    redirectUri: redirectUri.replace(/\s+/g, '').split(','),
    scope: scope.replace(/\s+/g, '').split(','),
  };
}

export function mapToClientMetaDto(clientFormData) {
  const { appIcon, appLaunchUrl, clientId, name } = clientFormData;
  const appIconByte = appIcon && appIcon[0] && appIcon[0].base64;
  return {
    appIcon: appIconByte && appIconByte.substring(appIconByte.indexOf(',') + 1),
    appLaunchUrl,
    clientId,
    name,
  };
}
