import axios from 'axios';

export const appClient = axios.create({
    baseURL: process.env.REACT_APP_API_URL,
    headers: {
        'Accept': 'application/json'
    },

    // whether Axios should throw an error if the status code is outside of 200-299 range
    validateStatus: () => true
});