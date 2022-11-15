import axios from 'axios';

export const authAppClient = axios.create({
    baseURL: process.env.REACT_APP_API_URL,
    headers: {
        'Accept': 'application/json',
        'Authorization': `${sessionStorage.getItem('token')}`
    },

    // whether Axios should throw an error if the status code is outside of 200-299 range
    validateStatus: () => true
});