/**
 * @file Axios的Vue插件（添加全局请求/响应拦截器）
 */

import axios from "axios";
axios.defaults.baseURL = "http://10.43.10.174:8889/bjat/";
// axios.defaults.baseURL = "http://47.95.8.179:8888/bjat/";
axios.defaults.timeout = 20000;
import Qs from "qs";
axios.interceptors.request.use(config => {
    let uuid = localStorage.getItem("uuid");
    let token = localStorage.getItem("token");
    if (uuid && token) {
        config.headers["uuid"] = uuid;
        config.headers["token"] = token;
    }
    return config;
});
// 添加请求拦截器
axios.interceptors.request.use(function (config) {
    if (config.method === "form") {
        config.headers = {
            'Accept': 'application/json, text/plain, */*',
            'Content-Type': "application/x-www-form-urlencoded"
        }
        config.method = 'post'
        config.transformRequest = [function (data) {
            data = Qs.stringify(data);
            return data;
        }]
    }
    return config;
}, function (error) {
    // 对请求错误做些什么
    return Promise.reject(error);
});
// 拦截响应response，并做一些错误处理
axios.interceptors.response.use(
    response => {
        const data = response.data;
        return data;
    },
    err => {
        // 这里是返回状态码不为200时候的错误处理
        if (err && err.response) {
            switch (err.response.status) {
                case 400:
                    err.message = "请求参数错误";
                    break;
                case 401:
                    err.message = "未授权，请登录";
                    window.location.href = "http://127.0.0.1";
                    this.$message.info("您的账号在其他地方登陆，请重新登陆！");
                    break;

                case 403:
                    err.message = "拒绝访问";
                    break;

                case 404:
                    err.message = `请求地址出错: ${err.response.config.url}`;
                    return Promise.reject(err);

                case 408:
                    err.message = "请求超时";
                    break;

                case 500:
                    err.message = "服务器内部错误";
                    break;

                case 501:
                    err.message = "服务未实现";
                    break;

                case 502:
                    err.message = "网关错误";
                    break;

                case 503:
                    err.message = "服务不可用";
                    break;

                case 504:
                    err.message = "网关超时";
                    break;

                case 505:
                    err.message = "HTTP版本不受支持";
                    break;

                default:
                    err.message = "操作失败";
            }
        }

        return Promise.reject(err);
    }
);

export default axios;