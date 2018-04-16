/* =====================================================================
 * @desc 封装请求接口
 * @param uri {string} 
 * @param data {object} post直接传值，get添加params字段{params:{字段1:值}}
 * @param config {object} 配置文件
 * @autor chenxi
 * =====================================================================
 * 1 根据process.env.NODE_ENV 获取对应的apiDomain
 * 2 处理ajax库axios，为了以后不重复引用，挂在原型对象上
 * 3 组件里面使用this.$axios.get/post(url,data,config)
 * 4 config参数如有需要可以参照https://www.kancloud.cn/yunye/axios/234845，或axios官网自己配置
 * 5 前置登录请在config里配置 isCheckLogin:true
 * 6 请求数据序列化，如果需要请在config传入{isForm:true}
 *----------------------------------------------------------------------
 * （1）post 例子                                      
    this.$ajax.post("/user/checkLogin.htm", {id:2222}  
    ).then((res)=>{                                    
        console.log(res.data)                          
    })

   （2）get 例子，如下或直接url里带参
    this.$ajax.get("/xiche/items.htm", {spuCode: 1067230}, timeout:1000,
    }).then((res)=>{
        console.log(res.data)
    })

    (3)jsonp 例子
    this.$ajax.jsonp('https://api.douban.com/v2/book/search?tag=修仙').then((res) =>{
        console.log(res)
    })
 *---------------------------------------------------------------------
 */
import Vue from 'vue';
import axios from 'axios';
import qs from 'qs';
let axiosIns = axios.create();
if (process.env.USER_ENV == 'dev') {
    axiosIns.defaults.baseURL = '/api'
} else {
    axiosIns.defaults.baseURL = '';
}
//设置默认返回数据类型
axiosIns.defaults.responseType = 'json';
axiosIns.defaults.headers = { 'X-Requested-With': 'XMLHttpRequest' };
//定义对于给定的HTTP 响应状态码是 resolve 或 reject  promise 。如果 `validateStatus` 返回 `true` (或者设置为 `null` 或 `undefined`)，promise 将被 resolve; 否则，promise 将被 rejecte
axiosIns.defaults.validateStatus = function(status) {
    return true;
};
//前置序列化表单默认为false
axiosIns.defaults.isForm = false
    //axios 请求拦截器，前置登录
axiosIns.interceptors.request.use(function(config) {
    //配置config
    config.headers.Accept = 'application/json';
    if (config.isForm) {
        config.transformRequest = [function(data) {
            return qs.stringify(data);
        }];
    }
    return config;
});

//axios 响应拦截器，状态码判断
axiosIns.interceptors.response.use(function(response) {
    let status = response.status;
    if (status === 200) {
        return Promise.resolve(response);
        console.log(response.data.msg)
    } else {
        return Promise.reject(response);
    }
});

/*
 * @desc 封装请求接口
 * @param uri {string} 
 * @param data {object} 请求参数
 * @param config {object} 配置文件
 */
let ajaxMethod = ['get', 'post']
let api = {};
ajaxMethod.forEach((method) => {
    //数组取值的两种方式
    api[method] = (uri, data, config) => {
        return new Promise(function(resolve, reject) {
            //封装get方式无需单独传params
            if (method === 'get'){
                if(!data.params){
                    let cacheData = JSON.stringify(data);
                    data = {}
                    data.params = JSON.parse(cacheData);
                }
            }
            axiosIns[method](uri, data, config).then((response) => {
                /*根据后台数据进行处理
                 *code===200   正常数据+错误数据     code!==200   网络异常等
                 */
                let thisHost = window.location.host,
                    hrefUrl = window.location.href;
                if (isNaN(response.data.result)) {
                    resolve(response.data);
                } else if (response.data.result === 1) {
                    resolve(response.data);
                } else if (response.data.result === 0) {
                    resolve(response.data);
                } else if (response.data.result === -99) {
                	window.location.href = "www.baidu.com";
                }
            }).catch((err) => {
                console.error(err);
                reject(err);
            });
        })
    }
});
//扩展一个jsonp方法
api.jsonp = (url) => {
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
    }
    //挂载到vue原型对象
Vue.prototype.$ajax = api;
//其他引用法
export default api