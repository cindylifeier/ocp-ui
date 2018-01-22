function getApiBaseUrl() {
  let apiBaseUrl = 'http://localhost/ocp-ui-api/ocp-fis';

  if (process.env.NODE_ENV === 'production') {
    apiBaseUrl = 'http://20.0.2.87/ocp-ui-api/ocp-fis';
  }

  return apiBaseUrl;
}

export default getApiBaseUrl;
