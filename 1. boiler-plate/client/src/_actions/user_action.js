import axios from 'axios';
import {
    LOGIN_USER,REGISTER_USER,AUTH_USER
} from './types';

export function loginUser(dataTosubmit) {

    const request = axios.post('/api/users/login', dataTosubmit)
        .then(response => response.data )

        //request를 reduser에 넘겨주는 작업
        return {
            type: LOGIN_USER,
            payload: request,
        }
}

export function registerUser(dataTosubmit) {

    const request = axios.post('/api/users/register', dataTosubmit)
        .then(response => response.data )

        //request를 reduser에 넘겨주는 작업
        return {
            type: REGISTER_USER,
            payload: request,
        }
}


export function auth() {

    const request = axios.post('/api/users/auth')
        .then(response => response.data )

        //request를 reduser에 넘겨주는 작업
        return {
            type: AUTH_USER,
            payload: request,
        }
}