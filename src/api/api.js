/**
 * Created by chenxi on 2017/6/9.
 */
import Vue from 'vue'
import axios from 'axios'
import {bus} from '../bus.js'
let api = {};

axios.defaults.withCredentials = true;
console.log('process.env.NODE_ENV', process.env.NODE_ENV);
if (process.env.NODE_ENV == 'development') {
    axios.defaults.baseURL = '/api'
} else {
    axios.defaults.baseURL = '';
}
console.log('axios.defaults.baseURL:' + axios.defaults.baseURL);
// axios.defaults.headers.common['Authorization'] = AUTH_TOKEN;
// axios.defaults.headers.post['Content-Type'] = 'application/x-www-form-urlencoded;charset=UTF-8';//配置请求头

//添加一个请求拦截器
// axios.interceptors.request.use(function (config) {
//   console.dir(config);
//   return config;
// }, function (error) {
//   // Do something with request error
//   return Promise.reject(error);
// });

// 添加一个响应拦截器
axios.interceptors.response.use(function (response) {
  if (response.data && response.data.errcode) {
    if (parseInt(response.data.errcode) === 40001) {
      //未登录
      bus.$emit('goto', '/login')
    }
  }

  return response;
}, function (error) {
  // Do something with response error
  return Promise.reject(error);
});

//基地址
let base = '';  //接口代理地址参见：config/index.js中的proxyTable配置

//通用方法
let POST = (url, params) => {
  return axios.post(`${base}${url}`, params).then(res => res.data)
}

let GET = (url, params) => {
  return axios.get(`${base}${url}`, {params: params}).then(res => res.data)
}

let PUT = (url, params) => {
  return axios.put(`${base}${url}`, params).then(res => res.data)
}
let DELETE = (url, params) => {
  return axios.delete(`${base}${url}`, {params: params}).then(res => res.data)
}


let PATCH = (url, params) => {
  return axios.patch(`${base}${url}`, params).then(res => res.data)
}
//扩展一个jsonp方法
let JSONP = (url) => {
    if (!url) {
        console.error('Axios.JSONP 至少需要一个url参数!')
        return;
    }
    return new Promise((resolve, reject) => {
        window.jsonCallBack = (result) => {
            resolve(result)
        }
        var JSONP = document.createElement("script");
        JSONP.type = "text/javascript";
        JSONP.src = `${url}&callback=jsonCallBack`;
        document.getElementsByTagName("head")[0].appendChild(JSONP);
        setTimeout(() => {
            document.getElementsByTagName("head")[0].removeChild(JSONP)
        }, 500)
    })
};
api = {
	'POST': POST,
	'GET': GET,
	'PUT': PUT,
	'DELET': DELETE,
	'PATCH': PATCH,
	'JSONP': JSONP
};
Vue.prototype.$http = api;
export default api;