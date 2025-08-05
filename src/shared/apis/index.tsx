import axios from 'axios';

import { HTTP_RESPONSE } from '../constants';

const apiBackend = axios.create({
    baseURL: process.env.REACT_APP_API_URL,
    validateStatus: (status: number) => {
        return status >= 200 && status <= 500;
    }
});

apiBackend.interceptors.request.use(
    config => {
        const userData = localStorage.getItem('@tiramulta:session');

        if (userData) {
            const session = JSON.parse(userData);
            if (config.headers) {
                config.headers['authorization'] = `Bearer ${session.token}`;
            }
        }

        return config;
    },
    error => {
        // Do something with request error
        return Promise.reject(error);
    }
);

apiBackend.interceptors.response.use(
    response => {
        if (response.status === HTTP_RESPONSE.STATUS.NOT_AUTORIZED) {
            localStorage.removeItem('@tiramulta:session');
            window.location.href = '/login';
        }

        return response;
    },
    error => {
        if (error.response.status === HTTP_RESPONSE.STATUS.NOT_AUTORIZED) {
            localStorage.removeItem('@tiramulta:session');
            window.location.href = '/login';
        }

        return error;
    }
);

export default apiBackend;
