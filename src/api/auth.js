import axios from 'axios';

const AUTH_URL = '/api/auth';

const getData = response => response.data;

/**
 * Login
 * @param {string} userName 
 */
export function login(userName) {
    return axios.post(`${AUTH_URL}/login`, {userName}).then(getData);
}