import axios from 'axios';

const baseUrl = 'http://localhost:8080/api/v1/'
// const baseUrl = 'https://icell.azurewebsites.net/api/v1/'

export const publicRequest = axios.create({
    baseURL: baseUrl
});