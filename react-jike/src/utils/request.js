import axios from 'axios';


const request = axios.create({
    baseURL: 'http://geek.itheima.net/v1_0',
    timeout: 5000,
})

request.interceptors.request.use(
    (config) => {
        console.log(config, '=== 请求拦截器 ===');
        
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
        return Promise.reject(error);
    }
)

export { request };
