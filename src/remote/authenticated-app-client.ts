import axios from 'axios';

export const authAppClient = axios.create({
    baseURL: process.env.REACT_APP_API_URL,
    headers: {
        'Accept': 'application/json'
    },

    // whether Axios should throw an error if the status code is outside of 200-299 range
    validateStatus: () => true
});

// Request interceptor allows us to set the Authorization header for each request
authAppClient.interceptors.request.use(
    (request) => {
        if(request.headers){
            request.headers['Authorization'] = `${sessionStorage.getItem('token')}`;
        }
          return request;
      }
  );