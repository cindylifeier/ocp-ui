const ApiService = {};

ApiService.getLocationsById = function (organizationId) {
  const url = 'http://localhost:8444/organizations/'.concat(organizationId).concat('/locations');
  return fetch(url)
          .then((response) => response.json())
          .then((json) => json)
          .catch((error) => { throw error; });
};

ApiService.getLocationsByIdAndStatus = function (organizationId, status) {
  const url = createUrl(organizationId, status);
  return fetch(url)
    .then((response) => response.json())
    .then((json) => json)
    .catch((error) => { throw error; });
};


function createUrl(organizationId, status) {
  const key = 'status=';
  const queryParams = status.length() === 2 ? key.concat(status[0]).concat('&').key.concat(status[1]) : key.concat(status[0]);
  return 'http://localhost:8444/organizations/'.concat(organizationId).concat('/locations?').concat(queryParams);
}

export { ApiService };
