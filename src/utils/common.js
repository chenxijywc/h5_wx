import ajax from "./axios";

/**
 * @example
 *
 * envUrl()
 * @return {String}
 */
export let envUrl = function(){
    let envlist = {
            "prod":".chexiang.com",
            "pre" :".chexiangpre.com",
            "sit" : ".chexiangsit.com",
            "development" : ".chexiangsit.com"
        },
        
        url = envlist[process.env.NODE_ENV];
        console.log(process.env.NODE_ENV);
        return url;
}
//判断当前是否是一个对象
export let isObject = function(val){
    if(toString.call(val) === '[object object]'){
        return true;
    }else{
        return false;
    }
}
//当前浏览器是否支持sessionStorage
export let isSessionStorage = function(){

    if(window.Storage && window.sessionStorage && window.sessionStorage instanceof Storage){
        return true;
    }else{
        return false;
    }

}
/**
 * 向页面添加JS文件
 * @param {String} url
 * @param {Function} callBack
 */
export let appendJscript = function(url, callBack) {
    let _head = document.getElementsByTagName("head")[0],
        _script = document.createElement("script"),
        _promise;
    
    _script.type = "text/javascript";
    _script.src = url;
    _head.appendChild(_script);

    _promise = new Promise(function(resolve, reject){
        //兼容IE
        _script.onreadystatechange = function() {
            if(this.readyState === "complete"){
                if(toString.call(callBack) === "[object funcion]"){
                    resolve();
                }
            }
        }
        //兼容谷歌，火狐，莎法丽，欧鹏浏览器
        _script.onload = function(){
            resolve();
        }
    });

    return _promise;
}
/**
 * 判断是否是微信
 * @return {Boolean}
 */
export let isWeixin = function(){
    let _userAgent = window.navigator.userAgent;

    if(_userAgent.toLowerCase().match(/MicroMessenger/i) == 'micromessenger'){
        return true;
    }else{
        return false;
    }
}
/**
 * 判断是否是APP
 * @return {Boolean}
 */
export let isApp = function(){
    let _userAgent = window.navigator.userAgent;

    if(_userAgent.indexOf('MongoToC') > 0){
        return true;
    }else{
        return false;
    }
}
/**
 * 判断是否是IOS系统
 * @return {Boolean}
 */
export let isIos = function(){
    let _userAgent = window.navigator.userAgent;
    return !!_userAgent.match(/\(i[^;]+;( U;)? CPU.+Mac OS X/);
}
/**
 * 判断是否是安卓系统
 * @return {Boolean}
 */
export let isAndroid = function(){
    let _userAgent = window.navigator.userAgent;
    return _userAgent.indexOf('Android') > -1 || _userAgent.indexOf('Adr') > -1;
}
/**获取sassion与设置
 * @param get(key) {String}
 * @return {String} or {Number}
 * @example
 * sessionStorageTool.get('name') //你好
 * ================================================================================
 * @param set() {String[key],String[value]} or {Object}
 * @example
 * sessionStorageTool.set('name', '你好') or sessionStorageTool.set({name: '你好'})
 * ================================================================================
 * @param del() {String[key]}
 * @example
 * sessionStorageTool.del('name')
 */
export let sessionStorageTool = {
    
    get (key) {
        //判断当前浏览器是否支持SessionStorage
        if(isSessionStorage()){
            let _value = sessionStorage.getItem(key);
            _value = toString.call(_value) === "[object String]" ? JSON.parse(_value) : _value;
            return _value;
        }else{
        
        }
    },
    set (...args){

        if(isSessionStorage()){
            if(toString.call(args[0]) === '[object Object]'){
                let _args = args[0];
                for(let i in _args){
                    sessionStorage.setItem(i, JSON.stringify(_args[i]));
                }
            }else if(args[1].toString()){
                sessionStorage.setItem(args[0], JSON.stringify(args[1]));
            }else{
                console.error('sessionStorageTool方法错误,请注意传参格式。(String[key],String[value]) or {key:value,key:value}');
            }
        }else{
            console.warn('sessionStorageTool方法异常,改浏览器不支持SessionStorage将转用COOKIE存储,如存储数据过大，将报出异常');
            setCookie(args);
        }
    },
    del (key){

        if(key){
            sessionStorage.removeItem(key);
        }
    }

}
/**
 *
 * @param {Number or String} val 金钱额
 * @param {Number or String} _decimals 保留多少位小数
 * @param {Boolean} _flag 是否千分位格式化
 * @param {String} _symbol 货币符号
 * @example
 * currency(39999.99, 1, true, "￥");
 *
 * 输出:￥39,999.9
 */
export let currency = (val, _decimals = 2, _flag = true, _symbol) => {
    val = parseFloat(val);
    if (!isFinite(val) || !val && val !== 0) {
      console.error('currency is invalid');
      return '';
    }
    let stringified = Math.abs(val).toFixed(_decimals),
        sign = val < 0 ? '-' : '';
        
    if (!_flag) {
      return sign + _symbol +  stringified;
    } else {
      let digitsRE = /(\d{3})(?=\d)/g,
          int = _decimals ? stringified.slice(0, -1 - _decimals) : stringified,
          i = int.length % 3,
          head = i > 0 ? int.slice(0, i) + (int.length > 3 ? ',' : '') : '',
          _float = _decimals ? stringified.slice(-1 - _decimals) : '';

      return sign + _symbol + head + int.slice(i).replace(digitsRE, '$1,') + _float;
    }
}
/**时间格式化
 * @param {String} or {Date} [time] [以中划线分割的时间格式 或者 一个时间类型的数据]
 * @param {String} [format] [时间格式化支持yyyy-mm-dd hh:mm:ss qq S]
 * @example
 * formatDate('2017-6-5', 'yyyy年MM月dd日 hh点mm分ss秒 qq季度 S毫秒')
 * @return {String} [2017年6月5日 00点00分00秒 02季度 0毫秒]
 */
export let formatDate = function(time, format){

    let _dateTime = time instanceof Date ? time : new Date(time),

        formatDate = {

            'M+': _dateTime.getMonth() + 1, //月
            'd+': _dateTime.getDate(),      //日
            'h+': _dateTime.getHours(),     //小时
            'm+': _dateTime.getMinutes(),   //分钟
            's+': _dateTime.getSeconds(),   //秒
            'q+': Math.floor((_dateTime.getMonth()+3)/3), //季度
            'S' : _dateTime.getMilliseconds() //毫秒

        };

    if(/(y+)/i.test(format)){
        var $1 = (/(y+)/i.exec(format))[1];

        format = format.replace($1, (_dateTime.getFullYear() + "").substr(4 - $1.length));

        for(var item in formatDate){
            if(new RegExp("("+ item +")").test(format)) {
                var $$1 = (new RegExp("("+ item +")").exec(format))[1];
                format = format.replace($$1, ($$1.length==1) ? (formatDate[item]) : (("00"+ formatDate[item]).substr((""+ formatDate[item]).length)));
            }
        }
    }

    return format;
}
//判断当前环境，对AJAX请求添加api标识，用于开发环境
export let isdev = function() {
    var env = process.env.NODE_ENV;
    return env === "development" ? "/api" : "";
}

/**获取cooike配置参数
 * @param {String} or {Array} [传入值如果为单一字符串，则返回一个字符串，如果为数组，则为结果数组，顺序按照传入时的顺序对应]
 * @example
 * getCookie('name')或者getCookie(['name1','name2','name3'...])
 */
export let getCookie = function(...args){
    let reg,result = [],allCookie = document.cookie,
        _args = args[0] instanceof Array ? args[0] : args;
    
    _args.forEach(function(val, index){
        reg = new RegExp("(^| )" + val + "=([^;]*)(;|$)");
        try{
            result.push(unescape(reg.exec(allCookie)[2]));
        }catch(e){
            if(allCookie.indexOf(val) == -1){
                result = [""];
            }else{
                console.warn("未知异常，请于管理员联系");
            }
        }
    });

    return result.length > 1 ? result : result[0];
}

//设置cookie可接受(name,value,time) time不必填
export let setCookie = function(...args){
    //获取当前时间
    let _expdate = new Date(),
        //获取当前二级域名
        _host = document.domain,
        _name,_value,_time;
        if(args.length >= 2){
            
            //判断传入的name与value
            try{
                _name = args[0].toString();
                _value = escape(args[1].toString());
            }catch(err){
                _name = '' + args[0];
                _value = escape('' + args[1]);
                console.log(_name);
                console.log('捕获异常' + err);
            }
            if(args[2]){
                _time = args[2];
                _expdate.setTime(_expdate.getTime() + (_time * 32 * 60 * 60 * 1000));
                document.cookie = _name + '=' + _value + ";expires=" + _expdate.toGMTString() + ";path=/;domain=" + _host;
            }else{
                document.cookie = _name + '=' + _value + ";expires=" + ";path=/;domain=" + _host;
            }
        }else{
            console.error('setCookie传参异常，必须传入指定的参数,请仔细查看使用说明参数格式为(name,value,time) time可省略');
        }
}


//去登陆
export let goLogin = function() {

    window.location.href = "/user/toLogin.htm?targetUrl=" + encodeURIComponent(window.location.href);

}
/**
 * 获取URL中的参数
 * @param {String or Object} args
 * @example
 * let obj = getQueryString('name');
 * or
 * let obj = getQueryString('name1','name2','name3','name4');
 *
 * 返回
 * @return {Object}
 * obj{
 *  name: value
 * }
 * or
 * obj{
 *  name1: value1,
 *  name2: value2,
 *  name3: value3,
 *  name4: value4
 * }
 */
//获取URL中的值getQueryString('value')或getQueryString('value1','value2','value3')以及getQueryString(['value1','value2','value3'])
export let getQueryString = function(...args) {
    let obj = {},
        regArr,
        reg,
        windowLocationHerf = window.location.href;

    args.forEach((val, index) => {
        if(typeof val != 'string') {
            return false;
        }
        reg = new RegExp("(^|&)"+ val +"=([^&]*)(&|$)");
        regArr = reg.exec(windowLocationHerf.split("?")[1]);
        
        if(regArr) {
            obj[val] = decodeURIComponent(regArr[2]);
        }
    });
    return obj;
}
//对象拷贝
export let copyObject = function(obj, matrix){
    let i,_obj,_matrix;

        _obj = isObject(obj) ? obj : {};
        _matrix = matrix;

    for(i in _matrix){
        if(typeof _matrix[i] === 'object'){

            _obj[i] = _matrix[i].constructor === 'Array' ? [] : {};
            copyObject(_obj[i], _matrix[i]);
        }else{
            _obj[i] = _matrix[i];
        }
    }
    return _obj;
}
//根据城市CODE获取省
export let getProvince = function(num){
    let numId = num.substr(0, 2) + '0000',
        data = {
            310000:"上海市",
            110000:"北京市",
            120000:"天津市",
            130000:"河北省",
            140000:"山西省",
            150000:"内蒙古自治区",
            210000:"辽宁省",
            220000:"吉林省",
            230000:"黑龙江省",
            320000:"江苏省",
            330000:"浙江省",
            340000:"安徽省",
            350000:"福建省",
            360000:"江西省",
            370000:"山东省",
            410000:"河南省",
            420000:"湖北省",
            430000:"湖南省",
            440000:"广东省",
            450000:"广西省",
            460000:"海南省",
            500000:"重庆市",
            510000:"四川省",
            520000:"贵州省",
            530000:"云南省",
            540000:"西藏自治区",
            610000:"陕西省",
            620000:"甘肃省",
            630000:"青海省",
            640000:"宁夏回族自治区",
            650000:"新疆维吾尔自治区"
        }
    for(var i in data){
        if(i == numId){
            var provName = data[i];
        }
    }
    return provName;
}
/**检测当前APP版本是否大于，等于或小于某个版本
 * @example
 * 假设当前版本为4.0.0
 * getVersion("3.0") 返回 1
 * @returns {Boolean}
 * 大于等于当前版本返回 true
 * 小于当前版本返回 false
 */
export let getVersion = function(version) {
    try{
        let appVersion = JSON.parse(window.navigator.userAgent).appVersion || "0.0.0",
        curVer = toString.call(version) === "[object Number]" ? version.toString() : version;
        
        if(appVersion.length == 3) appVersion = appVersion + ".0";

        if(curVer.length == 3) curVer = curVer + ".0";
        if(appVersion < curVer){
            return false;
        }else if(appVersion >= curVer){
            return true;
        }
        
    }catch(e){
        console.log('APPVersion未获取到');
    }
}
export let checkAppversionIsGt35 = function() {
    //判断AppVersion
    try{
        var ua = JSON.parse(window.navigator.userAgent),
        appVersion = ua.appVersion;
        console.log(ua);
        if(appVersion){
            var ava = appVersion.replace(".","");
            if(ava>=40){
                return true;
            }else return false;
        }else return false;
    }catch(e){
        console.log('APPVersion未获取到');
    }
}
/**APP内分享
 * @param {[object]} shareObj
 * @param {[function]} fn
 * @example
 *
 * var shareObj = {
 *   friend:{
 *      title:'哇，这么多免费养车好物等你领，快来车享家众测广场看看吧！',
 *      desc: "各种众测，全是最实用的好东西喔～",
 *      link: 'www.chexiang.com',
 *      imgUrl:"https://s2.cximg.com/cms/wap/resource/chexiangjiaP/320CXJPC/image/others/zc.png"
 *   },
 *   friendQuan:{
 *      title:"",
 *      desc:'哇，这么多免费养车好物等你领，快来车享家众测广场看看吧！',
 *      link: 'www.chexiang.com',
 *      imgUrl:"https://s2.cximg.com/cms/wap/resource/chexiangjiaP/320CXJPC/image/others/zc.png"
 *   }
 * }
 *
 * appShare(shareObj).then(function(){
 *     //成功
 *
 *     做点什么
 * },function(){
 *     //失败
 *
 *   做点什么
 * });
 */
export let appShare = function(shareObj) {

    let promise,
        _this = this,
        _isGt35 = checkAppversionIsGt35(),
        _friend = {
            title: shareObj.friend.title,
            url: shareObj.friend.link,
            content: shareObj.friend.desc,
            imgUrl: shareObj.friend.imgUrl
        },
        _Qoption = {
            title: shareObj.friendQuan.title,
            url: shareObj.friendQuan.link,
            content: shareObj.friendQuan.desc,
            imgUrl: shareObj.friendQuan.imgUrl
        };
        
        //追加到确定系统版本
    if( !_isGt35 && isApp()){
        //3.5及以下调用
        promise = new Promise(function(resolve, reject){

            lb.shareInfo({
                title: _friend.content,
                url: _friend.url,
                content: _friend.title,
                imgUrl: _friend.imgUrl
            }, function(data) {
                resolve(data);
            });
        });
    }else if(_isGt35){
        //4.0及以上调用
        //打开菜单
        lb.showMenu();
        //分享内容
        promise = new Promise(function(resolve, reject){

            lb.menuShareMsg({
                wx:_friend,
                wxtl:_Qoption
            },function(data){
                resolve(data);
            })
        });
    }

    return promise;
}

/**
 * 微信获取授权信息
 */
export let wxAccredit = function() {
    let getAccredit = getCookie("wemall_openid_c");
    if(isWeixin() && (getAccredit == '""' || !getAccredit)){
        let thisUrl = encodeURIComponent(window.location.href);
        window.location.assign("https://wx" + envUrl() + "/wxoauth2/s/getOpenId4CXJ.htm?targetUrl=" + thisUrl);
    }
}

//微信分享
//shareFriendOptions分享到朋友
//shareTimelineOptions分享到朋友圈
//option.shareObj.signUrl域名信息
export let wxShare = function(option, successCallBack, cancelCallBack, failCallBack) {
    //初始属性
    let url =  encodeURIComponent(window.location.href),
        signUrl = process.env.NODE_ENV == 'sit' ? "//recruit" + envUrl() : "//wx" + envUrl(),
        wxDomain = signUrl + '/wxoauth2/s/getShareArgs.htm?url=' + url,
        initOptions = {
            title: '', // 分享标题
            desc: '', // 分享描述
            link: '', // 分享链接
            imgUrl: '', // 分享图标
            type: '', // 分享类型,music、video或link，不填默认为link
            dataUrl: '', // 如果type是music或video，则要提供数据链接，默认为空
            trigger: function(res) {

            },
            success: function(data) {
                if (typeof successCallBack == "function") {
                    successCallBack(data);
                }
            },
            cancel: function() {
                // 用户取消分享后执行的回调函数
                if (typeof cancelCallBack == "function") {
                    cancelCallBack(data);
                }
            },
            fail: function(res) {
                if (typeof failCallBack == "function") {
                    failCallBack(data);
                }
            }

        },
        //对好友配置信息赋值
        
        shareFriendOptions = Object.assign({}, initOptions, option.friend),
        //对朋友圈配置信息赋值
        shareTimelineOptions = Object.assign({}, initOptions, option.friendQuan);
    ajax.jsonp(wxDomain).then((res) => {
        let data = res;
        wx.config({
            debug: false, // 开启调试模式
            appId: data.appId, // 必填，公众号的唯一标识
            timestamp: data.timestamp, // 必填，生成签名的时间戳
            nonceStr: data.nonceStr, // 必填，生成签名的随机串
            signature: data.signature, // 必填，签名，见附录1
            jsApiList: [
                'checkJsApi',
                'onMenuShareTimeline',
                'hideOptionMenu',
                'onMenuShareAppMessage',
                'getNetworkType',
                'openLocation',
                'getLocation'
            ]
        });

        wx.ready(function() {
            //分享给朋友
            wx.onMenuShareAppMessage(shareFriendOptions);
            //分享到朋友圈
            wx.onMenuShareTimeline(shareTimelineOptions);
        });

        wx.error(function(type, res) {

        });

        if (typeof WeixinJSBridge == "undefined") {
            if (document.addEventListener) {

                document.addEventListener('WeixinJSBridgeReady', wx.showOptionMenu, false);

            } else if (document.attachEvent) {

                document.attachEvent('WeixinJSBridgeReady', wx.showOptionMenu);
                document.attachEvent('onWeixinJSBridgeReady', wx.showOptionMenu);
            }
        } else {
            wx.showOptionMenu();
        }

        wx.showMenuItems({
            menuList: ['menuItem:share:appMessage', 'menuItem:share:timeline']
        });
    }, (err) => {

    });
}
/**高德定位方法
 * @example
 *
 * myPostion().then(function(data){
 *      //成功
 * },function(err){
 *      //失败
 * });
 *
 * 返回的data对象中的属性
 * position 定位结果(经纬度)
 * addressComponent 地址信息(城市，区，街道，门牌号等)
 */
export let myPostion = function(){
    let _promise,
      geolocationByGPS,
      geolocationByIP,
        mapObj = new AMap.Map('iCenter');
    
    _promise = new Promise(function(resolve, reject){
        mapObj.plugin('AMap.Geolocation', function () {
            geolocationByGPS = new AMap.Geolocation({
                enableHighAccuracy: true,//是否使用高精度定位，默认:true
                timeout: 2000,          //超过2秒后停止定位，默认：无穷大
                noIpLocate: 3,       //移动设备不允许IP定位
                maximumAge:10000   //缓存10秒
               
            });
            geolocationByIP = new AMap.Geolocation({
                enableHighAccuracy: true,
                timeout: 2000,
                noIpLocate: 0,  //移动设备允许IP定位
                noGeoLocation:3, //移动禁止浏览器定位
                maximumAge:10000
            });
            //mapObj.addControl(geolocation);
            geolocationByGPS.getCurrentPosition();
            AMap.event.addListener(geolocationByGPS, 'complete', function(data){
                resolve(data);//返回定位信息
            });
            AMap.event.addListener(geolocationByGPS, 'error', function(err){
                geolocationByIP.getCurrentPosition();//浏览器定位失败  启用IP定位
            });
           
            AMap.event.addListener(geolocationByIP, 'complete', function(data){
                resolve(data);//返回定位信息
            });
            AMap.event.addListener(geolocationByIP, 'error', function(err){
                reject(err);
                });
        });
    });
    return _promise;
}

/**通过高德API定位用户IP获取城市
 *
 */
export let GD_getIP = function(){
    let _promise, _CitySearch;
    
    AMap.plugin('AMap.CitySearch',function(){
        _CitySearch = new AMap.CitySearch();
    });
    _promise = new Promise(function(resolve, reject){
        _CitySearch.getLocalCity(function(status, result){
            if(status === "complete"){
                console.log(result);
                resolve(result);
            }else if(status === "error"){
                reject(result);
            }
        });
    });

    return _promise;
}

// 手机号码验证
export let checkPhone = (...args) => {
  let phone = args[0];
  if ((!phone) || /^\s*$/.test(phone)) {
    console.error("phone can not be empty");
    return false;
  } else {
    phone = (phone + "").trim();
  }
  if (/^\d{11}$/.test(phone)) {
    if (/^1[3|4|5|7|8|9][0-9]{9}$/.test(phone)) {
      return true;
    } else {
      console.error("phone number must start with the nine digits of 13, 14, 15, 17, 18, 19");
      return false;
    }
  } else {
    console.error("phone number must be 11 digits");
    return false;
  }
}

// 车牌验证
const plateReg =  /^[京津沪渝冀豫云辽黑湘皖鲁新苏浙赣鄂桂甘晋蒙陕吉闽贵粤青藏川宁琼使领A-Z]{1}[A-Z]{1}(?![A-Z]+\b)[A-HJ-NP-Z0-9]{4,5}[A-HJ-NP-Z0-9挂学警港澳]{1}$/;
export let checkPlate = (...args) => {
  let plate = args[0];
  if ((!plate) || /^\s*$/.test(plate)) {
    console.error("license plate can not be empty");
    return false;
  } else {
    plate = (plate + "").trim();
  }
  if (plateReg.test(plate)) {
    return true;
  } else {
    console.error("license plate is illegal");
    return false;
  }
}
