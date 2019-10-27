function ajax(obj) {
  var defaults = {
    type: 'get',
    async: true,
    url: '#',
    dataType: 'text',
    jsonp: 'callback',
    data: {},
    success: function(data) { console.log(data); }
  }

  for (var key in obj) {
    defaults[key] = obj[key];
  }

  if (defaults.dataType == 'jsonp') {
    ajax4Jsonp(defaults);
  } else {
    ajax4Json(defaults);
  }
}

function ajax4Json(defaults) {
  // 1、创建XMLHttpRequest对象
  var xhr = null;
  if (window.XMLHttpRequest) {
    xhr = new XMLHttpRequest();
  } else {
    xhr = new ActiveXObject('Microsoft.XMLHTTP');
  }
  // 把对象形式的参数转化为字符串形式的参数
  /*
  {username:'zhangsan','password':123}
  转换为
  username=zhangsan&password=123
  */
  var param = '';
  for (var attr in defaults.data) {
    param += attr + '=' + defaults.data[attr] + '&';
  }
  if (param) {
    param = param.substring(0, param.length - 1);
  }
  // 处理get请求参数并且处理中文乱码问题
  if (defaults.type == 'get') {
    defaults.url += '?' + encodeURI(param);
  }
  // 2、准备发送（设置发送的参数）
  xhr.open(defaults.type, defaults.url, defaults.async);
  // 处理post请求参数并且设置请求头信息（必须设置）
  var data = null;
  if (defaults.type == 'post') {
    data = param;
    xhr.setRequestHeader("Content-Type", "application/x-www-form-urlencoded");
  }
  // 3、执行发送动作
  xhr.send(data);
  // 处理同步请求，不会调用回调函数
  if (!defaults.async) {
    if (defaults.dataType == 'json') {
      return JSON.parse(xhr.responseText);
    } else {
      return xhr.responseText;
    }
  }
  // 4、指定回调函数（处理服务器响应数据）
  xhr.onreadystatechange = function() {
    if (xhr.readyState == 4) {
      if (xhr.status == 200) {
        var data = xhr.responseText;
        if (defaults.dataType == 'json') {
          // data = eval("("+ data +")");
          data = JSON.parse(data);
        }
        defaults.success(data);
      }
    }
  }
}

function ajax4Jsonp(defaults) {
  // 这里是默认的回调函数名称
  // expando: "jQuery" + ( version + Math.random() ).replace( /\D/g, "" ),
  var cbName = 'jQuery' + ('1.11.1' + Math.random()).replace(/\D/g, "") + '_' + (new Date().getTime());
  if (defaults.jsonpCallback) {
    cbName = defaults.jsonpCallback;
  }

  // 这里就是回调函数，调用方式：服务器响应内容来调用
  // 向window对象中添加了一个方法，方法名称是变量cbName的值
  window[cbName] = function(data) {
    defaults.success(data); //这里success的data是实参
  }

  var param = '';
  for (var attr in defaults.data) {
    param += attr + '=' + defaults.data[attr] + '&';
  }
  if (param) {
    param = param.substring(0, param.length - 1);
    param = '&' + param;
  }
  var script = document.createElement('script');
  script.src = defaults.url + '?' + defaults.jsonp + '=' + cbName + param;
  var head = document.getElementsByTagName('head')[0];
  head.appendChild(script);
}