// 请求中间件
import Axios from 'axios'

const service = Axios.create({
    baseURL: process.env.BASE_URL,
    timeout: 3000
});

service.interceptors.request.use(
    config => {
        if (config.method == 'post') {
            config.headers['Content-Type'] = 'application/json;charset=UTF-8';
            config.data = JSON.stringify(config.data)
        }
        return config;
    },
    error => {
      return Promise.reject(error.response);
    }
);

service.interceptors.response.use(
    response => {
        if (response.data.result == false && response.data.message == "OFFLINE") {
            sessionStorage.clear();
            setTimeout(function(){
                window.location.href = '/';
            }, 1500)
        }
        return response.data;
    },
    error => {
        console.log(error);
        return Promise.reject(error)
    }
);

export default { service };
