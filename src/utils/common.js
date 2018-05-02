

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
// 手机号码验证
export let testPhone = (phone) => {
	let phoneRegx = /^1[3|4|5|7|8|9][0-9]{9}$/;
	phone = phone || '';
    if (phoneRegx.test(phone.trim())) {
    	return true;
    }else {
    	return false;
    };
}
//验证验证码
export let testVerifyCode = (verifyCode) => {
	let codeRegx = /^[0-9]{6}$/;
	verifyCode = verifyCode || '';
    if (codeRegx.test(verifyCode.trim())) {
    	return true;
    }else {
    	return false;
    };
}
