// 请求中间件
import Axios from 'axios'

const service = Axios.create({
    baseURL: process.env.BASE_URL,
    timeout: 3000
});

service.interceptors.response.use(
    response => {
        if (response.data.result == false && response.data.msg == "OFFLINE") {
            sessionStorage.clear();
            setTimeout(function(){
                window.location.href = document.domain;
            }, 1500)
        }
        return response.data;
    },
    error => {
        console.log(error);
        return Promise.reject(error)
    }
)

export default { service };
