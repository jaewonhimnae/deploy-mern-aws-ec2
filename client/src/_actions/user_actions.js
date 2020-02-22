import axios from 'axios';
import {
    LOGIN_USER,
    REGISTER_USER,
    AUTH_USER,
    LOGOUT_USER,
} from './types';
import { BACK_SERVER_URL, TokenAndTokenExp } from '../components/Config.js';

export function registerUser(dataToSubmit){
    const request = axios.post(`${BACK_SERVER_URL}/api/users/register`,dataToSubmit)
        .then(response => response.data);
    
    return {
        type: REGISTER_USER,
        payload: request
    }
}

export function loginUser(dataToSubmit){
    const request = axios.post(`${BACK_SERVER_URL}/api/users/login`,dataToSubmit)
                .then(response => response.data);

    return {
        type: LOGIN_USER,
        payload: request
    }
}

export function auth(){
    const request = axios.get(`${BACK_SERVER_URL}/api/users/auth?${TokenAndTokenExp}`)
    .then(response => response.data);

    return {
        type: AUTH_USER,
        payload: request
    }
}

export function logoutUser(){
    const request = axios.get(`${BACK_SERVER_URL}/api/users/logout?${TokenAndTokenExp}`)
    .then(response => response.data);

    return {
        type: LOGOUT_USER,
        payload: request
    }
}

