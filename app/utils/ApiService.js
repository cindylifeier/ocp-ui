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
  const page = 'page=1&';
  let queryParams = '';
  if (status && status.length === 1) {
    queryParams = page.concat(key).concat(status[0]);
  } else if (status && status.length === 2) {
    queryParams = page.concat(key).concat(status[0]).concat(',').concat(status[1]);
  } else if (status && status.length === 3) {
    queryParams = page.concat(key).concat(status[0]).concat(',').concat(status[1]).concat(',').concat(status[2]);
  }
  return 'http://localhost:8444/organizations/'.concat(organizationId).concat('/locations?').concat(queryParams);
}

export { ApiService };
