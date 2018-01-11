const ApiService = {};

ApiService.getData = function getData(url) {
  return fetch(url)
    .then((response) => response.json())
    .then((json) => json)
    .catch((error) => { throw error; });
};

export default ApiService;
