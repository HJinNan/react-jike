import axios from 'axios';
import { getToken } from './token';
import { message } from 'antd';
import { removeToken } from './token';

const request = axios.create({
    baseURL: 'http://geek.itheima.net/v1_0',
    timeout: 5000,
})

request.interceptors.request.use(
    (config) => {
        const token = getToken();
        if(token) {
            config.headers.Authorization = `Bearer ${token}`;
        }
        
        return config;
    },
    (error) => {
        return Promise.reject(error);
    }
)

request.interceptors.response.use(
    (response) => {
        return response;
    },
    (error) => {
        console.dir(error);
        if(error.response?.status === 401) {
            message.error('登录过期，请重新登录');
            removeToken();
            // 使用 window.location 进行跳转
            window.location.href = '/login';
        }
        return Promise.reject(error);
    }
)   

export { request };
