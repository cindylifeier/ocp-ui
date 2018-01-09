

// export function getLocationsByOganizationId(organizationId) {
//   const url = 'http://localhost:8444/organizations/'.concat(organizationId).concat('/locations');
//   return fetch(url).then((response) => response.json()).then((json) => json).catch((error) => { throw error; });
// }


const ApiService = {};

ApiService.getLocationsById = function (organizationId) {
  const url = 'http://localhost:8444/organizations/'.concat(organizationId).concat('/locations');
  return fetch(url).then((response) => response.json()).then((json) => json).catch((error) => { throw error; });
};

export { ApiService };
