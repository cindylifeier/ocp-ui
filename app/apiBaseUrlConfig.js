function getApiBaseUrl() {
  let apiBaseUrl = 'http://localhost:8446/ocp-fis';

  if (process.env.NODE_ENV === 'production') {
    apiBaseUrl = 'http://http://20.0.2.87:8446/ocp-fis';
  }

  return apiBaseUrl;
}

export default getApiBaseUrl;
