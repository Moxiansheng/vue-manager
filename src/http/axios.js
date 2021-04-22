import axios from "axios";
import store from "../store";
import router from "../router";
// import qs from "qs";

axios.defaults.baseURL = "http://localhost:8090"; //正式
// axios.defaults.baseURL = 'http://test' //测试

//请求头
axios.defaults.headers["Content-Type"] = "application/json;charset=UTF-8";
axios.defaults.headers["Access-Control-Allow-Origin"] = "*";
axios.defaults.headers["Access-Control-Allow-Headers"] =
    "Content-Type, Content-Length, Authorization, Accept, X-Requested-With , yourHeaderFeild";
axios.defaults.headers["Access-Control-Allow-Methods"] =
    "PUT,POST,GET,DELETE,OPTIONS";
axios.defaults.headers["X-Powered-By"] = "3.2.1";
//设置超时
axios.defaults.timeout = 10000;

const AUTHORIZATION = "authorization"

axios.interceptors.request.use(
    (config) => {
        let token = store.getters.getToken;
        if(token){
            console.log(token);
            config.headers[AUTHORIZATION] = token;
        }
        return config;
    },
    (error) => {
        return Promise.reject(error);
    }
);

axios.interceptors.response.use(
    (response) => {
        if (response.status == 200) {
            if(response.data.code == 1000){
                // 删除原有凭证
                store.commit('user/deleteToken');
                store.commit('user/deleteUser');
                // 跳转至登陆界面
                router.push({ path: "/login" });
            }else{
                store.commit('user/setToken', response.headers[AUTHORIZATION]);
            }
            return Promise.resolve(response);
        } else {
            return Promise.reject(response);
        }
    },
    (error) => {
        alert(`异常请求：${JSON.stringify(error.message)}`);
    }
);

export default {
    post(url, data) {
        return new Promise((resolve, reject) => {
            axios({
                method: "post",
                url,
                data: data,
            })
                .then((res) => {
                    resolve(res.data);
                })
                .catch((err) => {
                    reject(err);
                });
        });
    },

    get(url, data) {
        return new Promise((resolve, reject) => {
            axios({
                method: "get",
                url,
                params: data,
            })
                .then((res) => {
                    resolve(res.data);
                })
                .catch((err) => {
                    reject(err);
                });
        });
    },
};
